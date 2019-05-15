package bi;

import bi.agg.Operator;
import bi.define.*;
import bi.exception.AggBaseException;
import bi.work.CarrierContainer;
import foundation.data.Entity;
import foundation.data.EntitySet;
import foundation.engine.Command;
import foundation.engine.Engine;
import foundation.engine.State;
import foundation.persist.DataHandler;
import foundation.persist.SqlSession;
import foundation.persist.sql.NamedSQL;
import foundation.persist.sql.SQLRunner;
import foundation.rule.RuleEngine;
import foundation.rule.RuleList;
import foundation.rule.RuledResult;
import foundation.util.Util;

import java.sql.*;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class WorkEngine extends Engine {

	private static CarrierContainer carrierContainer;
	private static WorkEngine instance;

	static {
		carrierContainer = CarrierContainer.getInstance();
	}

	private WorkEngine() throws Exception {
		super();
	}

	@Override
	protected void initCommandMap() throws SecurityException, NoSuchMethodException {
		commandMap.put("createbaseaggregation",	new Command(this, WorkEngine.class.getMethod("createBaseAggregation", Operator.class), true));
		commandMap.put("aggachieve",	new Command(this, WorkEngine.class.getMethod("aggAchieve", Operator.class), true));

	}

	public static synchronized WorkEngine getInstance() {
		if (instance == null) {
			try {
				instance = new WorkEngine();
			}
			catch (Exception e) {
				e.printStackTrace();
			}
		}

		return instance;
	}

	public void calculate(Operator operator) {
		progressor.newTask("数据计算");
		try {
			carrierContainer.refresh();

			// 1. 校验
			if (TestOn.Validate) {
				progressor.newPhase("phase_validate", "数据校验");
				int errorCnt = validate();

				if (errorCnt > 0) {
					progressor.terminate("数据校验未通过，请检查");
					return;
				}
				progressor.endPhase();
			}

		}
		catch (Exception e) {
			progressor.terminate("系统错误，运行终止：" + e.getClass() + ":" + e.getMessage());
		}
		finally {
			progressor.endTask();
		}
	}


	private int validate() throws Exception {
		RuleEngine ruleEngine = RuleEngine.getInstance();// 创建引擎

		NamedSQL namedSQL = NamedSQL.getInstance("getCheckList");

		RuleList ruleList = RuleList.newInstance(namedSQL);// 创建校验集
		RuledResult ruledResult = ruleEngine.exec(ruleList);// 执行

		int errorCnt = ruledResult.getErrorCnt();// 执行结果
		return errorCnt;
	}
	public void aggAchieve(Operator operator) {
		Connection connection = null;
		try {
			//1
			connection = SqlSession.createConnection();
			DatabaseMetaData dbMetaData = connection.getMetaData();
			ResultSet tableRs = dbMetaData.getTables(null, null, null,new String[] {AggConstant.CONNECTION_TABLE, AggConstant.CONNECTION_VIEW});
			while (tableRs.next()) {
				String tableName = tableRs.getString(AggConstant.CONNECTION_TABLE_NAME);
				ArrayList<String> achieveTypes = checkTableName(tableName);
				if (Util.isNull(achieveTypes) || achieveTypes.size() == 0) {
					continue;
				}
				execTarget(tableName, achieveTypes);

			}

		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
		}
		finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
	}

	private void execTarget(String tableName, ArrayList<String> achieveTypes) {
		String subTableName = tableName.substring(AggConstant.BI_Default_Agg.length(), tableName.length());
		String[] split = subTableName.split(Util.SubSeparator);
		if (Util.isNull(split) || split.length == 0) {
			return;
		}
		String DDIType = split[0];
		if (DDIType.equalsIgnoreCase("inventory")) {
			return;
		}
		String targetName = null;
		String targetTableName = null;
		String tagertjion = null;
		String tagertfilter = null;
		if (achieveTypes.contains("o")) {
			if (DDIType.equalsIgnoreCase("Purchase")) {
				// surpersier
				targetName = "target";
				targetTableName = "VIEW_Supervisor_MonthTarget";
				tagertjion = " and (agg.Supervisor = m.SupervisorID or agg.RSM = m.SupervisorID)";
				tagertfilter = " and (agg.Supervisor is not null or agg.RSM is not null)";
			} else if (DDIType.equalsIgnoreCase("Sale")) {
				// saleperson
				targetName = "target";
				targetTableName = "VIEW_Sale_MonthTarget";
				tagertjion = " and (agg.Supervisor = m.salecode or agg.RSM = m.salecode or agg.Salesperson = m.salecode)";
				tagertfilter = " and (agg.Supervisor is not null or agg.RSM is not null or agg.Salesperson is not null)";
			}
		}else if (achieveTypes.contains("d")){
			targetName = "target";
			targetTableName = " VIEW_Distributor_MonthTarget";
			tagertjion = " and (agg.DistributorCode = m.DistributorCode) ";
			tagertfilter = " and (agg.DistributorCode is not null) ";
		}

		execTargetSql(tableName, targetName, targetTableName, tagertjion, tagertfilter);

		execAchieveSql(tableName, targetName);

		try {
			execMgrowthSql(tableName, targetName, split);
		} catch (SQLException e) {
			e.printStackTrace();
		}


	}

	private void execMgrowthSql(String tableName, String targetName, String[] dimensionGroupSubName) throws SQLException {
		int index = targetName.indexOf("target");
		if (index == -1) {
			throw new AggBaseException("字段不是target结尾:" + tableName);

		}
		Connection connection = SqlSession.createConnection();
		String selectSql = MessageFormat.format(AggConstant.CONNECTION_Field_Template, tableName);
		PreparedStatement ps = connection.prepareStatement(selectSql);
		ResultSet rs = ps.executeQuery();
		ResultSetMetaData meta = rs.getMetaData();

		int columeCount = meta.getColumnCount();
		ArrayList<String> dimensionList = new ArrayList<>();
		for (int i = 1; i <= columeCount; i++) {
			String aggTableField = meta.getColumnName(i);
			if (AggConstant.filedUnCatchList.contains(aggTableField)) {
				continue;
			}
            Dimension dimension = AggDimensionsContainer.getDimensionByCode(aggTableField);
            if (Util.isNull(dimension)) {
                continue;
            }
            if (dimension.getCode().equalsIgnoreCase(AggConstant.peroid)) {
                continue;
            }
            dimensionList.add(dimension.getCode());
        }
        dimensionList.add(AggConstant.BI_Field_Aggcode);

        String growthjion = dimensionList.stream()
                .map(s -> MessageFormat.format(AggConstant.LeftJoinFactor_Template, AggConstant.agg, s, AggConstant.A01, s))
                .collect(Collectors.joining(Util.And));

        String dimensions = dimensionList.stream()
                .collect(Collectors.joining(Util.comma));
        String aggdimensions = dimensionList.stream().filter(s -> !s.equalsIgnoreCase(AggConstant.BI_Field_Aggcode))
                .map(s -> MessageFormat.format(AggConstant.Select_Field_Template,AggConstant.agg, s))
                .collect(Collectors.joining(Util.comma));
		/*Map<String, DimensionGroup> dimensionGroupMap = AggDimensionsContainer.getInstance().getDimensionGroupMap();
		Collection<DimensionGroup> DimensionGroups = dimensionGroupMap.values();

		List<String> dimensionGroupSubNameList = Arrays.stream(dimensionGroupSubName).filter(s -> !AggConstant.AchieveMustTableNameMap.keySet().contains(s))
				.collect(Collectors.toList());
		List<List<String>> recombineList = new ArrayList<>();
		Collection<String> values = AggConstant.AchieveMustTableNameMap.values();
		for (String mustDimension : values) {
			ArrayList<String> oneMustList = new ArrayList<>();
			oneMustList.add(mustDimension);
			recombineList.add(oneMustList);
		}
		for (String oneSubName : dimensionGroupSubNameList) {
			List<DimensionGroup> checkedDimensionGroupList = DimensionGroups.stream().filter(dimensionGroup -> dimensionGroup.getTableSubName().equalsIgnoreCase(oneSubName))
					.collect(Collectors.toList());
			if (Util.isNull(checkedDimensionGroupList) || checkedDimensionGroupList.size() == 0) {
				continue;
			}
			if (checkedDimensionGroupList.size() > 1) {
				throw new AggCalculateException(MessageFormat.format("{0}在dimensiongroup匹配到多个", oneSubName));
			}
			DimensionGroup dimensionGroup = checkedDimensionGroupList.get(0);
			String code = dimensionGroup.getCode();

			EntitySet dimensionSet = null;
			try {
				dimensionSet = DataHandler.getDataSet(AggConstant.BI_TABLE_Dimension, Util.stringJoin(AggConstant.BI_Filter_Active, Util.And, Util.quotedEqualStr(AggConstant.BI_Field_GroupId, code)));
			} catch (Exception e) {
				e.printStackTrace();
			}
			if (dimensionSet.size() == 0) {
				throw new AggDBlLoadException(MessageFormat.format("{0}未匹配到子维度:", code));
			}
			List<String> dimensionCodeList = dimensionSet.getFieldList(AggConstant.BI_Field_Code);
			recombineList.add(dimensionCodeList);
		}

		ArrayList<ArrayList<String>> dimensionDikaerList = Util.Dikaerji0(recombineList);

		for (ArrayList<String> onecombineDimensionList : dimensionDikaerList) {
			Collections.sort(onecombineDimensionList, new Comparator<String>() {
				@Override
				public int compare(String o1, String o2) {
					int compare = o1.toLowerCase().compareTo(o2.toLowerCase());
					return compare;
				}
			});

			String growthjion = onecombineDimensionList.stream().filter(s -> !AggConstant.peroid.equalsIgnoreCase(s))
					.map(s -> MessageFormat.format(AggConstant.LeftJoinFactor_Template, AggConstant.agg, s, AggConstant.A01, s))
					.collect(Collectors.joining(Util.And));

			String dimensions = onecombineDimensionList.stream().filter(s -> !AggConstant.peroid.equalsIgnoreCase(s))
					.collect(Collectors.joining(Util.comma));

			String aggcode = onecombineDimensionList.stream().collect(Collectors.joining(Util.Separator));*/
			String account = "Amount";
			String growth =  targetName.replace("target", "ygrowth");

			NamedSQL getMgrowth = null;
			try {
				getMgrowth = NamedSQL.getInstance("aggMgrowth");
			} catch (Exception e) {
				e.printStackTrace();
			}

			getMgrowth.setParam("aggtable", tableName);
			getMgrowth.setParam("mgrowth", growth);
			getMgrowth.setParam("account", account);
			getMgrowth.setParam("dimensions", dimensions);
			getMgrowth.setParam("aggdimensions", aggdimensions);
			getMgrowth.setParam("growthjion", growthjion);
			//getMgrowth.setParam("aggcode", aggcode);
			int i = 0;
			try {
				i = SQLRunner.execSQL(getMgrowth);
			} catch (Exception e) {
				e.printStackTrace();
			}
			logger.info(MessageFormat.format("更新表：{0}字段：{1} 条数：{2}", tableName, growth, i));

			getMgrowth.setParam("target", AggConstant.Roxolid.toLowerCase() + targetName);
			account = "Quantity";
			getMgrowth.setParam("account", account);
			getMgrowth.setParam("mgrowth", AggConstant.Roxolid.toLowerCase() + growth);
			int newi = 0;
			try {
				newi = SQLRunner.execSQL(getMgrowth);
			} catch (Exception e) {
				e.printStackTrace();
			}
			logger.info(MessageFormat.format("更新表：{0}字段：{1} 条数：{2}", tableName, AggConstant.Roxolid.toLowerCase() + growth, newi));


	}

	private void execAchieveSql(String tableName, String targetName) {
		String account = "Amount";
		int index = targetName.indexOf("target");
		if (index == -1) {
			throw new AggBaseException("字段不是target结尾:" + tableName);

		}

		String achieve =  targetName.replace("target", "achieve");

		try {
			NamedSQL aggAchieve = NamedSQL.getInstance("aggAchieve");
			aggAchieve.setParam("aggtable", tableName);
			aggAchieve.setParam("target", targetName);
			aggAchieve.setParam("account", account);
			aggAchieve.setParam("achieve", achieve);
			int i = SQLRunner.execSQL(aggAchieve);
			logger.info(MessageFormat.format("更新表：{0}字段：{1} 条数：{2}", tableName, achieve, i));
			aggAchieve.setParam("target", AggConstant.Roxolid.toLowerCase() + targetName);
			account = "Quantity";
			aggAchieve.setParam("account", account);
			aggAchieve.setParam("achieve", AggConstant.Roxolid.toLowerCase() + achieve);
			int newi = SQLRunner.execSQL(aggAchieve);
			logger.info(MessageFormat.format("更新表：{0}字段：{1} 条数：{2}", tableName, AggConstant.Roxolid.toLowerCase() + achieve, newi));

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void execTargetSql(String tableName, String targetName, String targetTableName, String tagertjion, String tagertfilter) {
		try {
			NamedSQL aggAchieve = NamedSQL.getInstance("aggTarget");
			//1 total
			aggAchieve.setParam("aggtable", tableName);
			aggAchieve.setParam("targetName", targetName);
			aggAchieve.setParam("targetTableName", targetTableName);
			aggAchieve.setParam("tagertjion", tagertjion);
			aggAchieve.setParam("targetfilter", tagertfilter);
			aggAchieve.setParam("category", "总销售额");
			int i = SQLRunner.execSQL(aggAchieve);
			logger.info(MessageFormat.format("更新表：{0}字段：{1} 条数：{2}", tableName, targetName, i));
			aggAchieve.setParam("targetName", AggConstant.Roxolid.toLowerCase() + targetName);
			aggAchieve.setParam("category", AggConstant.Roxolid);
			int newi = SQLRunner.execSQL(aggAchieve);
			logger.info(MessageFormat.format("更新表：{0}字段：{1} 条数：{2}", tableName, AggConstant.Roxolid.toLowerCase() + targetName, newi));

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private ArrayList<String> checkTableName(String tableName) {
		ArrayList<String> achieveList = new ArrayList<>();
		if (Util.isNull(tableName)) {
			return achieveList;
		}
		if (!(tableName.startsWith(AggConstant.BI_Default_Agg))) {
			return achieveList;
		}
		String[] split = tableName.split(Util.SubSeparator);

		List<String> subDimensionList = Arrays.stream(split).filter(s -> !Util.isNull(s)).map(s -> s.trim()).collect(Collectors.toList());

		if (!subDimensionList.containsAll(AggConstant.AchieveMustTableNameMap.keySet())) {
			return achieveList;
		}
		for (String subDimension : subDimensionList) {
			if (AggConstant.AchieveCanTableNameList.contains(subDimension)) {
				achieveList.add(subDimension);
			}
		}


		return achieveList;
	}

	
	public void createBaseAggregation(Operator operator) {
		instance.setState(State.working);
		progressor.newTask("数据计算");
		// 1. 校验
		if (TestOn.Validate) {
			progressor.newPhase("phase_validate", "数据校验");
			int errorCnt;
			try {
				errorCnt = validate();
				if (errorCnt > 0) {
					progressor.terminate("数据校验未通过，请检查");
					return;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

			progressor.endPhase();
		}

		//2. 数据初始化(清空)
		progressor.newPhase("phase_initdata", "数据初始化");
		EntitySet dataSet;
		try {
			dataSet = DataHandler.getDataSet("bi_table", "clear = 'T'");
			for (Entity entity : dataSet) {
				String tableName = entity.getString("name");
				NamedSQL truncateInstance = NamedSQL.getInstance("deleteByCriteria");
				truncateInstance.setParam("tableName", tableName);
				truncateInstance.setParam("filter", "period = (select id from peroid where active = 'T')");
				int execSQL = SQLRunner.execSQL(truncateInstance);
				
				logger.info("delete--" + tableName + "----count:" +execSQL);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//refreshTerrtory();
		
		progressor.endPhase();
		//3. 循环聚合
		AggThemeGroupContainer.refresh();
		List<AggThemeGroup> aggThemeGroupList = AggThemeGroupContainer.getInstance().getAggThemeGroupList();
		AtomicInteger allSize = new AtomicInteger();
        aggThemeGroupList.stream().map(aggThemeGroup -> addAllSize(aggThemeGroup, allSize)).collect(Collectors.toList());
		progressor.setMax(allSize.longValue());
		progressor.newPhase("agg", "开始聚合数据");
		for (AggThemeGroup aggThemeGroup : aggThemeGroupList) {
			logger.info("aggThemeGroup : " + aggThemeGroup.getName());
			logger.info(MessageFormat.format(AggConstant.AGG_GroupInfo_Template, allSize,aggThemeGroup.getName()));

			progressor.newPhase("agggroup", MessageFormat.format("聚合{0}组数据", aggThemeGroup.getName()));
			try {
				AggOneTemeGroup(aggThemeGroup, allSize);
			} catch (Exception e) {
				e.printStackTrace();
			}
			progressor.endPhase();
		}

		aggAchieve(operator);

		progressor.endPhase();
		instance.setState(State.Idle);
	}

    private <R> R addAllSize(AggThemeGroup aggThemeGroup, AtomicInteger allSize) {
        List<AggTheme> aggThemesMapList = aggThemeGroup.getAggThemesMapList();
        aggThemesMapList.stream().map(aggTheme -> allSize.addAndGet(aggTheme.getDimensionSpaces().size())).collect(Collectors.toList());
        return null;
    }

    /**
	 * @param aggThemeGroup
	 * @param allSize
	 * @throws Exception
	 */
	private void AggOneTemeGroup(AggThemeGroup aggThemeGroup, AtomicInteger allSize) {
		List<AggTheme> aggThemesMapList = aggThemeGroup.getAggThemesMapList();
		logger.info("aggThemes size :" + aggThemesMapList.size());
        AtomicInteger nowSize = new AtomicInteger(0);
		AggType aggCode = AggType.valueOf(aggThemeGroup.getCode());
		for (AggTheme aggTheme : aggThemesMapList) {
			logger.info(MessageFormat.format(AggConstant.AGG_Info_Template, allSize, nowSize, aggThemeGroup.getName(), aggCode ));
			progressor.newPhase("aggtheme", MessageFormat.format("聚合{0}主题数据", aggCode));

			AggOneTheme(aggCode, aggTheme,allSize, nowSize);
			progressor.endPhase();
		}

	}

	/**
	 * @param code
	 * @param aggTheme
	 * @param allSize
     * @param nowSize
     * @throws Exception
	 */
	private void AggOneTheme(AggType code, AggTheme aggTheme, AtomicInteger allSize, AtomicInteger nowSize) {
		List<DimensionSpace> dimensionSpaces = aggTheme.getDimensionSpaces();
		List<String> dimensionAggFieldNameList = aggTheme.getDimensionAggFieldNameList();
		//achieve
		if (Util.isEmptyStr(code)) {
			return;
		}
		switch (code) {
			case Achieve:
			case Sum:
				for (DimensionSpace dimensionSpace : dimensionSpaces) {
					AggContext aggContext = new AggContext(aggTheme, dimensionSpace, dimensionAggFieldNameList);
					if (aggContext.isShouldStop()) {
						continue;
					}
					progressor.newPhase("aggtheme", MessageFormat.format("聚合{0}维度数据", aggContext.getThemeTableName()));
					execOneTheme(aggContext);
                    nowSize.getAndIncrement();
                    progressor.stepIt();
                    progressor.endPhase();
                    logger.info(MessageFormat.format(AggConstant.AGG_Info_Template, allSize, nowSize, code, aggContext.getThemeTableName()));
				}


		        break;
			case Rank:
				for (DimensionSpace dimensionSpace : dimensionSpaces) {
					List<Dimension> dimensionList = dimensionSpace.getDimensionList();
					// e.g. c_code-period
					List<Dimension> parentDimensionsLists = getParentDimensionsLists(dimensionList);
					for (Dimension parentDimension : parentDimensionsLists) {
						List<Measurment> aggList = aggTheme.getAggList();
						for (Measurment measurment : aggList) {
							AggContext aggContext = new AggContext(aggTheme, dimensionSpace, dimensionAggFieldNameList);
							aggContext.setRankAgged(measurment);
							aggContext.setRankWhere(parentDimension);
							if (aggContext.isShouldStop()) {
								continue;
							}
							execOneTheme(aggContext);
						}
					}

				}
				break;
			case Growth:
				AggContext aggContext = new AggContext(aggTheme, dimensionAggFieldNameList);
				if (aggContext.isShouldStop()) {
					return;
				}
				execOneTheme(aggContext);
				break;
		    default:
		        break;

		}
	}

	/**
	 * @param dimensionList
	 * @return 
	 */
	private List<Dimension> getParentDimensionsLists(List<Dimension> dimensionList) {
		//c_code
		ArrayList<Dimension> rankAreaList = new ArrayList<Dimension>();
		for (Dimension dimension : dimensionList) {
			//int codeNo = dimension.getCodeNo();
			int codeNo = -1;
			String groupId = dimension.getGroupId();
			try {
				EntitySet dataSet = DataHandler.getDataSet(AggConstant.BI_TABLE_Dimension, "groupid = " + Util.quotedStr(groupId) + " and no >=" + codeNo);
				for (Entity entity : dataSet) {
					Dimension fatherDimension = new Dimension(entity);
					rankAreaList.add(fatherDimension);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return rankAreaList;
	}

	/**
	 * @param aggContext
	 * @throws Exception
	 */
	private void execOneTheme(AggContext aggContext) {
		String themeTableName = aggContext.getThemeTableName();
		logger.info("execOneTheme: " + themeTableName);
		AggTheme aggTheme = aggContext.getAggTheme();
		
		try {
			String sqlTemplate = aggTheme.getSqlTemplate();
			String sqlTemplateName = aggTheme.getSqlTemplateName();
			NamedSQL namedSQL = new NamedSQL(sqlTemplateName, sqlTemplate);
			
			aggContext.setParametersTo(namedSQL);
			int execSQL = SQLRunner.execSQL(namedSQL);
			logger.info("exec num: " + execSQL);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
