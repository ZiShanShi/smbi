package bi;

import bi.define.AggDimensionsContainer;
import bi.define.AggMainFieldContainer;
import bi.define.Dimension;
import bi.define.DimensionGroup;
import bi.exception.AggCalculateException;
import foundation.persist.sql.LeftSegment;
import foundation.persist.sql.NamedSQL;
import foundation.util.ContentBuilder;
import foundation.util.Util;
import foundation.variant.VariantList;
import foundation.variant.VariantSegment;
import org.apache.log4j.Logger;

import java.text.MessageFormat;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class GroupSqlBulider {
    private Logger logger;
    private List<String> measurmentList;
    private Map<String, LeftSegment> mainSegmentMap;
    private Map<String, Dimension> dimensionLevelMap;
    private boolean isMonthData = false;

    private static Map<String, String> peroidNameMap = new HashMap<>();
    static {
        peroidNameMap.put(AggConstant.month,AggConstant.peroid);
    }

    private boolean addBrand = false;
    private String userId;

    private String aggTableName;
    private String aggCode;
    private String filter;
    private String userType;
    private boolean addRegion = false;

    public GroupSqlBulider() {
        logger = Logger.getLogger(this.getClass());
    }
    private void clearPreData() {
        this.aggTableName = null;
        this.aggCode = null;
        this.filter = null;
        this.userType = null;
        this.isMonthData = false;
        this.addBrand = false;
        this.addRegion = false;
        this.userId = null;

        dimensionLevelMap = null;
        mainSegmentMap = null;
        measurmentList = null;
    }

    public String getAggRegroupedSql(String userId, String userType, String topicCode, String fields, String filter) {
        clearPreData();
        this.filter = filter;
        this.userType = userType;
        this.userId = userId;
        String[] fieldsArray = Util.split(fields);
        ArrayList<AggDragableField> dragableFieldList = new ArrayList<>();

        long brandCount = Arrays.stream(fieldsArray).filter(s -> s.equalsIgnoreCase(AggConstant.Brand)).count();
        if (brandCount == 0) {
            addBrand = true;
            dragableFieldList.add(new AggDragableField(AggConstant.Brand));
        }
        long regionCount = Arrays.stream(fieldsArray).filter(s -> s.equalsIgnoreCase(AggConstant.Region)).count();
        if (regionCount == 0) {
            addRegion = true;
            dragableFieldList.add(new AggDragableField(AggConstant.Region));
        }

        //默认添加peroid orgaineze  pr
        dragableFieldList.add(new AggDragableField(AggConstant.peroid));

        if (userType.equalsIgnoreCase(AggConstant.SuperAdmin)) {
            dragableFieldList.add(new AggDragableField(AggConstant.RSM));
        } else {
            dragableFieldList.add(new AggDragableField(userType));
        }

        for (String field : fieldsArray) {
            field = field.trim();
            AggDragableField aggDragableField = new AggDragableField(field);
            if (aggDragableField.getType().equals(EDragableFieldType.unknown)) {
                logger.error(MessageFormat.format("fields中存在不能识别的字段:{0}", field));
                return null;
            }
            if (dragableFieldList.contains(aggDragableField)) {
                continue;
            }
            dragableFieldList.add(aggDragableField);
        }
        if (!Util.isNull(filter)) {
            List<String> filterFieldList = filterFieldList();

            for (String filterField : filterFieldList) {
                filterField = filterField.trim();
                AggDragableField aggDragableField = new AggDragableField(filterField);

                if (aggDragableField.getType().equals(EDragableFieldType.unknown)) {
                    logger.error(MessageFormat.format("{0}--filters中存在不能识别的字段:{1}",topicCode, filterField));
                    return null;
                }

                if (dragableFieldList.contains(aggDragableField)) {
                    continue;
                }
                dragableFieldList.add(aggDragableField);

            }
        }

        String groupedSql = combineSql(topicCode, dragableFieldList);
        return groupedSql;
    }



    private String combineSql(String topicCode, ArrayList<AggDragableField> dragableFieldList) {
        dimensionLevelMap = new HashMap<>();
        mainSegmentMap = new HashMap<>();
        measurmentList = new ArrayList<>();
        boolean regroup = false;

        for (AggDragableField aggDragableField : dragableFieldList) {
            String rawField = aggDragableField.getField();
            EDragableFieldType type = aggDragableField.getType();
            if (EDragableFieldType.agg.equals(type)) {
                // 包含peroid 相关
                Dimension dimension = aggDragableField.getDimension();
                String groupId = dimension.getGroupId();
                String dimensionCode = dimension.getCode();

                /*if (groupId.equalsIgnoreCase(AggConstant.peroid) && (dimensionCode.equalsIgnoreCase(AggConstant.month))) {
                    //包含    月  则关联peroid 否则 将peroid 变成 year 到 month 的
                    this.isMonthData = true;

                    Dimension peroidDimension = AggDimensionsContainer.getInstance().getPeroidDimension(AggConstant.peroid);
                    dimensionLevelMap.put(groupId, peroidDimension);
                    if (dimensionCode.equalsIgnoreCase(AggConstant.month)) {
                        String peroidName = AggMainFieldContainer.getTableName(rawField);
                        LeftSegment leftSegment = AggMainFieldContainer.getleftSegment(peroidName);
                        mainSegmentMap.put(rawField, leftSegment);
                    }
                }else if (groupId.equalsIgnoreCase(AggConstant.peroid) && !(dimensionCode.equalsIgnoreCase(AggConstant.month) || dimensionCode.equalsIgnoreCase(AggConstant.peroid))){
                    //需将 year 加到quarter
                    regroup = true;

                    String peroidName = AggMainFieldContainer.getTableName(rawField);

                    LeftSegment leftSegment = AggMainFieldContainer.getleftSegment(peroidName);
                    // 只加了一层  目前够用
                    String parentCode = dimension.getParentCode();
                    if (!parentCode.equalsIgnoreCase(dimensionCode)) {
                        //多加了leftjion 需要后面减
                        mainSegmentMap.put(parentCode, leftSegment);
                    }
                    mainSegmentMap.put(rawField, leftSegment);

                }else if(groupId.equalsIgnoreCase(AggConstant.peroid) && (dimensionCode.equalsIgnoreCase(AggConstant.peroid))) {
                    Dimension preDimension = dimensionLevelMap.get(groupId);

                    if (Util.isNull(preDimension)) {
                        dimensionLevelMap.put(groupId, dimension);
                    }
                }*/

                /*if (isMonthData && groupId.equalsIgnoreCase(AggConstant.peroid)) {
                    continue;
                }*/
                Dimension preDimension = dimensionLevelMap.get(groupId);

                if (Util.isNull(preDimension)) {
                    dimensionLevelMap.put(groupId, dimension);
                }
                else {
                    int prelevel = preDimension.getLevel();
                    int level = dimension.getLevel();
                    int now = prelevel - level;

                    if (now < 0) {
                        dimensionLevelMap.put(groupId, dimension);
                        String preGroupId = preDimension.getGroupId();
                        String preField = preDimension.getCode();
                        add2MainMap(preField, preGroupId);
                    } else {
                        add2MainMap(rawField, groupId);
                    }
                }

            } else if (EDragableFieldType.measurment.equals(type)) {
                measurmentList.add(rawField);
            } else if (EDragableFieldType.main.equals(type)) {
                regroup = true;
                String mainTableName = aggDragableField.getTableName();
                LeftSegment leftSegment = AggMainFieldContainer.getleftSegment(mainTableName);
                mainSegmentMap.put(rawField, leftSegment);
            }

        }
        this.aggTableName = combineAggTableName(topicCode, dimensionLevelMap);

        this.aggCode = combineAggCode(dimensionLevelMap);

        fixLeftTableName();

        String sql;
        if (regroup) {
            sql = regroupData();
        } else {
            sql = getCommonAggSql();
        }


        return sql;
    }

    private void add2MainMap(String rawField, String groupId) {
        DimensionGroup dimensionGroupById = AggDimensionsContainer.getInstance().getDimensionGroupById(groupId);
        String masterTableName = dimensionGroupById.getMasterTableName();
        LeftSegment leftSegment = AggMainFieldContainer.getleftSegment(masterTableName);
        mainSegmentMap.put(rawField, leftSegment);
    }

    private String getCommonAggSql() {
        return plugVariantValue("commonAggTemplate");
    }

    private String plugVariantValue(String SqlName) {
        String sql = null;
        try {
            NamedSQL aggGroupByTemplate = NamedSQL.getInstance(SqlName);
            VariantList variantList = aggGroupByTemplate.getVariantList();
            for (VariantSegment variantSegment : variantList) {
                String name = variantSegment.getName();
                if (Util.isNull(name)) {
                    continue;
                }
                String value = getVariantValue(name);
                aggGroupByTemplate.setParam(name, value);

            }
            sql = aggGroupByTemplate.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return sql;
    }
    private String regroupData() {
        return plugVariantValue("aggGroupByTemplate");
    }

    private String getVariantValue(String name) {
        String variantString = null;
        ContentBuilder  builder;
        if (name.toLowerCase().equalsIgnoreCase("aggcode")) {
            variantString = this.aggCode;
        } else if (name.toLowerCase().equalsIgnoreCase("aggtable")) {
            variantString = this.aggTableName;
        }else if (name.toLowerCase().equalsIgnoreCase("selectfield")) {
            builder = getFieldByDimenisonFilter(AggConstant.Real);

            // sum
            String sumField = measurmentList.stream().map(s -> MessageFormat.format(AggConstant.AGG_SameSum_Template, s)).collect(Collectors.joining(Util.comma));
            builder.append(sumField);
            variantString = builder.toString();
        }else if (name.toLowerCase().equalsIgnoreCase("selectinfield") || name.toLowerCase().equalsIgnoreCase("field")) {
            builder = getFieldByDimenisonFilter(AggConstant.Raw);

            // sum
            String sumField = measurmentList.stream().collect(Collectors.joining(Util.comma));
            builder.append(sumField);
            variantString = builder.toString();
        }else if (name.toLowerCase().equalsIgnoreCase("leftjion")) {
            builder = getLeftJoinSegmentSql();

            variantString = builder.toString();

        }else if (name.toLowerCase().equalsIgnoreCase("groupby")) {
            builder = getFieldByDimenisonFilter(AggConstant.GroupBy);

            variantString = builder.toString();
        }else if (name.toLowerCase().equalsIgnoreCase("filter")) {
            String[] filterSegment = filter.split(Util.And);
            builder = new ContentBuilder(Util.And);
            for (String oneSegment : filterSegment) {
                builder.append(MessageFormat.format("({0})", oneSegment));

            }
            variantString = builder.toString();
        }
        else if(name.toLowerCase().equalsIgnoreCase("notnull")) {
            builder = getFieldByDimenisonFilter(AggConstant.Raw);
            String notnullString = builder.toString();
            String[] split = notnullString.split(Util.comma);
            String notnullFilter = Arrays.stream(split)
                    .map(s -> Util.bracketStr(Util.stringJoin(s, AggConstant.AGG_IS_NOT_NULL , Util.Or, s ,AggConstant.AGG_IS_NOT_Empty)))
                    .collect(Collectors.joining(Util.And));
            variantString = notnullFilter;
        }else if (name.toLowerCase().equalsIgnoreCase("userid")) {
            if (userType.equalsIgnoreCase(AggConstant.SuperAdmin)) {
                variantString = Util.String_Empty;
            } else {
                variantString =  Util.stringJoin(Util.And ,Util.quotedEqualStr(MessageFormat.format(AggConstant.Select_Field_Template, AggConstant.agg, userType), userId));
            }
        }

        return variantString;
    }

    private ContentBuilder getFieldByDimenisonFilter(String type) {
        ContentBuilder builder = new ContentBuilder(Util.comma);
        HashSet<String> finalFieldSet = new HashSet<>();
        //field

        Set<String> groupIdSet = dimensionLevelMap.keySet();
        for (String groupId : groupIdSet) {
            Dimension dimension = dimensionLevelMap.get(groupId);
            String code = dimension.getCode().trim();

            String field = null;
            if (AggConstant.Raw.equalsIgnoreCase(type)) {
                field = MessageFormat.format(AggConstant.Select_Field_Template, AggConstant.agg, code);
            } else if(AggConstant.Real.equalsIgnoreCase(type)){
                if (AggConstant.peroid.equalsIgnoreCase(code)) {
                    continue;
                }
                if (addBrand && AggConstant.Brand.equalsIgnoreCase(code)) {
                    continue;
                }
                if (addRegion && AggConstant.Region.equalsIgnoreCase(code)) {
                    continue;
                }
                if (AggConstant.SuperAdmin.equalsIgnoreCase(userType) && code.equalsIgnoreCase(AggConstant.RSM)) {
                    continue;
                }
                field = code;
            }else if (AggConstant.GroupBy.equalsIgnoreCase(type) ) {
                if (AggConstant.peroid.equalsIgnoreCase(code)) {
                    continue;
                }
                if (addBrand && AggConstant.Brand.equalsIgnoreCase(code)) {
                    continue;
                }
                if (addRegion && AggConstant.Region.equalsIgnoreCase(code)) {
                    continue;
                }
                if (AggConstant.SuperAdmin.equalsIgnoreCase(userType) && code.equalsIgnoreCase(AggConstant.RSM)) {
                    continue;
                } else {
                    field = MessageFormat.format(AggConstant.Select_Field_Template, AggConstant.A01, code);
                }
            }
            finalFieldSet.add(field.trim());
        }
        //main
        Set<String> mainFieldSet = mainSegmentMap.keySet();
        for (String mainField : mainFieldSet) {
            LeftSegment leftSegment = mainSegmentMap.get(mainField);
            String leftTableAcronym = leftSegment.getLeftTableAcronym();
            String field = null;
            if (AggConstant.Raw.equalsIgnoreCase(type)) {
                field = MessageFormat.format(AggConstant.Select_Field_Template, leftTableAcronym, mainField);
            } else if(AggConstant.Real.equalsIgnoreCase(type)){
                field = mainField;
            }else if (AggConstant.GroupBy.equalsIgnoreCase(type)) {
                field = MessageFormat.format(AggConstant.Select_Field_Template, AggConstant.A01, mainField);
            }
            finalFieldSet.add(field.trim());
        }



        String collect = finalFieldSet.stream().collect(Collectors.joining(Util.comma));
        builder.append(collect);

        return builder;
    }

    private ContentBuilder getLeftJoinSegmentSql() {
        ContentBuilder builder;
        builder = new ContentBuilder(Util.String_Space);

        Collection<LeftSegment> leftSegmentsCollextion = mainSegmentMap.values();
        HashSet<LeftSegment> leftSegmentSets = new HashSet<>(leftSegmentsCollextion);
        //转set 去重
        for (LeftSegment leftSegment : leftSegmentSets) {
            String mainTableName = leftSegment.getLeftTable();
            String leftTableAcronym = leftSegment.getLeftTableAcronym();
            String leftSqlSegment = AggConstant.LeftJoinMain_Template.replace(AggConstant.LeftJoin_MainTable, MessageFormat.format(AggConstant.LeftJointableAs, mainTableName, leftTableAcronym));

            leftSegment.setLeftTable(leftTableAcronym);

            leftSqlSegment = leftSqlSegment.replace(AggConstant.LeftJoin_Leftjionfactor, leftSegment.toString());

            leftSegment.setLeftTable(mainTableName);

            builder.append(leftSqlSegment);

        }

        return builder;
    }

    private void fixLeftTableName() {
        AtomicInteger ascii = new AtomicInteger(97);
        HashSet<LeftSegment> leftSegments = new HashSet<>(mainSegmentMap.values());
        for (LeftSegment leftSegment : leftSegments) {
            String behalfMaintable = String.valueOf((char) ascii.get());
            leftSegment.setLeftTableAcronym(behalfMaintable);
            ascii.incrementAndGet();
        }

    }

    private List<String> filterFieldList() {
        if (Util.isNull(filter))
        return null;

        ArrayList<String> filterFieldList = new ArrayList<>();
        String[] filterSegment = filter.split(Util.And);
        for (String oneSegment : filterSegment) {
            int index = oneSegment.indexOf(Util.Equal);
            if (index == -1) {
                continue;
            }
            String fieldName = oneSegment.substring(0, index);
            filterFieldList.add(fieldName);
        }
        return filterFieldList;
    }

    private String combineAggCode(Map<String, Dimension> dimensionLevelMap) {
        Collection<Dimension> values = dimensionLevelMap.values();
        List<String> fieldList = values.stream().map(Dimension::getCode).collect(Collectors.toList());
        ContentBuilder builder = new ContentBuilder(AggUtil.initSeparator);
        Collections.sort(fieldList, new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                return  o1.toLowerCase().compareTo(o2.toLowerCase());
            }
        });

        for (String oneField : fieldList) {
            builder.append(oneField);
        }

        return builder.toString();
    }

    private String combineAggTableName(String code, Map<String, Dimension> dimensionLevelMap) {
        Set<String> dimensionGroupSet = dimensionLevelMap.keySet();

        ArrayList<String> groupList = new ArrayList<>(dimensionGroupSet);

        ArrayList<String> maxSizeDimensionList  = AggDimensionsContainer.getInstance().getMaxSizeDimensionGroupList();

        String subAggName = AggUtil.calculateTableName(groupList,maxSizeDimensionList);

        String aggTableName = MessageFormat.format("agg_{0}_{1}", code, subAggName);
        return aggTableName;
    }

    public String getAchieveRegroupedSql(String userId, String userType, String aggCode, String type, String sqlName, String dataType, String filter) {
        if (Util.isNull(type)) {
            type = AggConstant.Total;
        }
        this.userType = userType;
        this.userId = userId;
        String[] split = aggCode.split(Util.semicolon);

        ArrayList<String> strings = new ArrayList<>(Arrays.asList(split));
        if (userType.equalsIgnoreCase(AggConstant.SuperAdmin)) {
            strings.add(AggConstant.RSM);
        } else {
            strings.add(userType);
        }

        String realAggCode = strings.stream().collect(Collectors.joining(Util.Separator));

        EAchieveDataType achieveDataType = EAchieveDataType.valueOf(dataType);
        Map<String, String> paramsMap = initBaseParams(type, achieveDataType, filter);

        paramsMap.put(AggConstant.BI_Field_Aggcode, realAggCode);

        if (userType.equalsIgnoreCase(AggConstant.SuperAdmin)) {
            paramsMap.put("userid", Util.String_Empty);
        } else {
            String userid = Util.stringJoin(Util.And, Util.quotedEqualStr(MessageFormat.format(AggConstant.Select_Field_Template, AggConstant.agg, userType), userId));
            paramsMap.put("userid", userid);
        }

        try {
            NamedSQL instance = NamedSQL.getInstance(sqlName);
            String sql = instance.getOriginalSql();
            instance.setSql(sql);
            VariantList variantList = instance.getVariantList();
            for (VariantSegment variantSegment : variantList) {
                String name = variantSegment.getName();
                String value = paramsMap.get(name);
                if (Util.isNull(value) && !name.equalsIgnoreCase("userid")) {
                    //TODO  未匹配 咋整  报错
                    if (AggConstant.organizationJoin.equalsIgnoreCase(name)) {
                        String tableName = paramsMap.get(AggConstant.Sql_Field_tableName);
                        String datatypecode = paramsMap.get(AggConstant.datatypecode);
                        String organizationJoin = getOrganizationJoin(achieveDataType, tableName, datatypecode);
                        value = organizationJoin;

                    } else if (AggConstant.PageFilter.equalsIgnoreCase(name)) {
                        value = Util.defaultFilter;
                    } else {
                        throw new AggCalculateException(MessageFormat.format("有字段未匹配==={0}", name));
                    }

                }
                instance.setParam(name, value);
            }
            return instance.getSQLString();
        } catch (Exception e) {
            e.printStackTrace();
        }


        return null;

    }

    private String getOrganizationJoin(EAchieveDataType dataType, String tableName, String datatypecode) {
        ContentBuilder builder = new ContentBuilder(Util.String_Space);
        if (dataType.equals(EAchieveDataType.sellin)) {
            String first = MessageFormat.format(AggConstant.LeftJoin_Template, AggConstant.organization, "a", AggConstant.ParentID, "r", AggConstant.UserID);
            builder.append(first);

            String end = MessageFormat.format(AggConstant.LeftJoin_Template, tableName, "m", datatypecode, "a", AggConstant.LoginName);
            builder.append(end);

        } else if (dataType.equals(EAchieveDataType.sellout)) {
            String first = MessageFormat.format(AggConstant.LeftJoin_Template, AggConstant.organization, "a", AggConstant.ParentID, "r", AggConstant.UserID);
            builder.append(first);

            String second = MessageFormat.format(AggConstant.LeftJoin_Template, AggConstant.organization, "b", AggConstant.ParentID, "a", AggConstant.BI_Field_Id);
            builder.append(second);

            String end = MessageFormat.format(AggConstant.LeftJoin_Template, tableName, "m", datatypecode, "b", AggConstant.LoginName);
            builder.append(end);

        } else if(dataType.equals(EAchieveDataType.Distributor)){
            String first = MessageFormat.format(AggConstant.LeftJoin_Template, AggConstant.organization, "a", AggConstant.BI_Field_Id, "r", AggConstant.UserID);
            String second = MessageFormat.format(AggConstant.LeftJoin_Template, AggConstant.DistributorHierarchy, "b", AggConstant.RSM, "a", AggConstant.LoginName);
            String end = MessageFormat.format(AggConstant.LeftJoin_Template, tableName, "m", datatypecode, "b", datatypecode);
            builder.append(first);
            builder.append(second);
            builder.append(end);
        }
        return builder.toString();
    }

    private Map<String, String> initBaseParams(String type, EAchieveDataType dataType,String filter) {
        Map<String, String> paramsMap = new HashMap<>();
        String achieveSubName = AggConstant.DataTypeMap.get(dataType);
        paramsMap.put(AggConstant.brandType, type);
        paramsMap.put(AggConstant.dataType, achieveSubName);


        String tableName = MessageFormat.format(AggConstant.Achieve_TableName_Template, achieveSubName, type);
        paramsMap.put(AggConstant.Sql_Field_tableName, tableName);

        String datatypecode = achieveSubName;
        if (dataType.equals(EAchieveDataType.Distributor)) {
            datatypecode = "DistributorCode";
        }
        else if (dataType.equals(EAchieveDataType.sellout)) {
            datatypecode = "Salesperson";
        }
        paramsMap.put(AggConstant.datatypecode, datatypecode);

        if (Util.isNull(filter)) {
            return paramsMap;
        }
        String[] filterSegment = filter.split(Util.And);
        int montno = 12;
        ContentBuilder builder = new ContentBuilder(Util.And);
        for (String oneSegment : filterSegment) {
            builder.append(MessageFormat.format("({0})", oneSegment));
            int index = oneSegment.indexOf(Util.Equal);
            if (index == -1) {
                continue;
            }
            String fieldName = oneSegment.substring(0, index);
            String fieldValue = oneSegment.substring(index + 1, oneSegment.length());

            if (Util.isNull(fieldName)) {
                continue;
            }
            fieldName = fieldName.trim();
            if (Util.isNull(fieldValue)) {
                fieldValue = Util.String_Empty;
            }

            if (AggConstant.Peroid_Quarter.equalsIgnoreCase(fieldName) && montno > 3) {
                montno = 3;
            }

            if (AggConstant.Peroid_Month.equalsIgnoreCase(fieldName)) {
                montno = 1;

            }

            paramsMap.put(fieldName.trim(), fieldValue.trim());
        }
        paramsMap.put(AggConstant.monthno, String.valueOf(montno));
        paramsMap.put(AggConstant.filter, builder.toString());

        return paramsMap;
    }


}
