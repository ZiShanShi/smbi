package bi.define;

import bi.AggConstant;
import bi.AggUtil;
import bi.exception.AggDBlLoadException;
import foundation.data.Entity;
import foundation.data.EntitySet;
import foundation.persist.DataHandler;
import foundation.persist.SqlSession;
import foundation.persist.TableMeta;
import foundation.persist.sql.NamedSQL;
import foundation.persist.sql.SQLRunner;
import foundation.util.Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class AggThemeGroup {

    private static final String HISTORY_SPLIT = ";";

    private List<AggTheme> aggThemesMapList;
    private String code;
    private String name;
    private Logger logger;


    public AggThemeGroup(Entity themeGroup) {
        aggThemesMapList = new ArrayList<>();
        logger = LoggerFactory.getLogger(this.getClass());
        load(themeGroup);
    }

    private void load(Entity themeGroup) {
        String id = themeGroup.getString(AggConstant.BI_Field_Id);
        if (Util.isEmptyStr(id)) {
            throw new AggDBlLoadException("themeGroup id is null");
        }
        this.code = themeGroup.getString(AggConstant.BI_Field_Code);
        this.name = themeGroup.getString(AggConstant.BI_Field_Name);
        try {

            String groupId = Util.quotedEqualStr(AggConstant.BI_Field_ThemeGroupId, id);
            EntitySet themeGroupMapEntitySet = DataHandler.getDataSet(AggConstant.BI_TABLE_THEMEGROUPMAP, groupId);

            EntitySet dataSet = DataHandler.getDataSet(AggConstant.BI_TABLE_THEMEG, AggConstant.BI_Filter_Active + " and groupid = " + Util.quotedStr(id));
            if (dataSet.size() == 0) {
                if (themeGroupMapEntitySet.size() == 0) {
                    return;
                }
                initThemeByGroup(themeGroupMapEntitySet, dataSet);
                AggTableContainer.getInstance().load();
            }

            for (Entity entity : dataSet) {
                AggTheme aggTheme = new AggTheme(entity);
                aggThemesMapList.add(aggTheme);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private void initThemeByGroup(EntitySet themeGroupMapSet, EntitySet dataSet) throws Exception {
        for (Entity themeGroupMapEntity : themeGroupMapSet) {
            addOneTable(themeGroupMapEntity,dataSet);
        }
    }

    private void addOneTable(Entity themeGroupMapEntity, EntitySet dataSet) throws Exception {

        TableMeta tableMeta = dataSet.getTableMeta();
        String measurmentGroups = themeGroupMapEntity.getString(AggConstant.BI_Field_Measurmentgroups);
        String dimensionGroupStr = themeGroupMapEntity.getString(AggConstant.BI_Field_DimensionGroups);
        String topicTableName = themeGroupMapEntity.getString(AggConstant.BI_Field_RealTable);
        Map<AggDirection, ArrayList<String>> realFieldTypeList = null;
        if (Util.isNull(measurmentGroups)) {
            realFieldTypeList = getRealFieldTypeList(topicTableName);
            ArrayList<String> strings = realFieldTypeList.get(AggDirection.Measurment);
            measurmentGroups = strings.stream().collect(Collectors.joining(Util.semicolon));
        }

        if (Util.isNull(dimensionGroupStr)) {
            if (Util.isNull(realFieldTypeList)) {
                realFieldTypeList = getRealFieldTypeList(topicTableName);
            }

            ArrayList<String> strings = realFieldTypeList.get(AggDirection.Dimension);
            dimensionGroupStr = strings.stream().collect(Collectors.joining(Util.semicolon));
        }

        List<String> measurmentList = Util.StringToList(measurmentGroups, Util.semicolon);
        String measurmentStrs = measurmentList.stream().map(measurment -> Util.quotedStr(measurment)).collect(Collectors.joining(Util.comma));
        NamedSQL getmeasurmentSql = NamedSQL.getInstance(AggConstant.Sql_getMeasurmentByCode);
        getmeasurmentSql.setParam(AggConstant.BI_Field_Code, measurmentStrs);
        EntitySet entitySet = SQLRunner.getEntitySet(getmeasurmentSql);
        String measurments = entitySet.getEntityList().stream().map(entity -> entity.getString(AggConstant.BI_Field_Code)).collect(Collectors.joining(Util.semicolon));


        ArrayList<String> dimensionGroupList = Util.StringToList(dimensionGroupStr, Util.semicolon);
        String[] dimensionGroupArray = new String[dimensionGroupList.size()];
        dimensionGroupList.toArray(dimensionGroupArray);
        ArrayList<ArrayList<String>> dimensionGroups = new ArrayList<>();
        Util.combine(dimensionGroupArray, dimensionGroups);

        ArrayList<String> maxSizeDimensionList = dimensionGroups.get(0);
        for (ArrayList<String> oneDimensionGroups : dimensionGroups) {
            Entity entity = new Entity(tableMeta);
            entity.set(0, Util.newShortGUID());
            entity.set(1, AggConstant.BI_Theme_DefaultName);
            entity.set(2, AggConstant.BI_SqlTemplate_DefaultAchieveSqlId);

            String groupId = themeGroupMapEntity.getString(AggConstant.BI_Field_ThemeGroupId);
            entity.set(3, groupId);

            String oneDimensionStr = oneDimensionGroups.stream().map(dimension -> MessageFormat.format("{0}.*", dimension)).collect(Collectors.joining(Util.semicolon));
            entity.set(4, oneDimensionStr);
            entity.set(5, measurments);

            entity.set(6, topicTableName);

            String subAggName = AggUtil.calculateTableName(oneDimensionGroups, maxSizeDimensionList);
            String topicType = topicTableName.substring(AggConstant.BI_Default_TopicView.length());
            String aggTableName = MessageFormat.format("agg_{0}_{1}", topicType, subAggName);
            if (!AggUtil.checkTableExists(aggTableName)) {
                EAggCreateCode createCode = AggUtil.createAggTable(aggTableName, groupId, oneDimensionGroups, measurmentList);
                if (EAggCreateCode.uncreated.equals(createCode)) {
                    throw new AggDBlLoadException("{0} 创建失败", aggTableName);
                }
                if (EAggCreateCode.parse.equals(createCode)) {
                     continue;
                }
            }

            entity.set(7, aggTableName);
            entity.set(8, Util.TRUE);
            entity.insert();

            dataSet.append(entity);
        }
    }

    private Map<AggDirection, ArrayList<String>> getRealFieldTypeList(String topicTableName) throws Exception {
        Map<AggDirection, ArrayList<String>> typeMap = new HashMap<>();
        Connection connection = SqlSession.createConnection();
        String selectSql = MessageFormat.format(AggConstant.CONNECTION_Field_Template, topicTableName);
        PreparedStatement ps = connection.prepareStatement(selectSql);
        ResultSet rs = ps.executeQuery();
        ResultSetMetaData meta = rs.getMetaData();
        int columeCount = meta.getColumnCount();
        for (int i = 1; i <= columeCount; i++) {
            String aggTableField = meta.getColumnName(i);
            if (AggConstant.filedUnCatchList.contains(aggTableField)) {
                continue;
            }
            Entity line = DataHandler.getLine(AggConstant.BI_TABLE_Measurment, AggConstant.BI_Field_Code, aggTableField);
            if (!Util.isNull(line)) {
                String type = line.getString(AggConstant.BI_Field_Type);
                AggDirection parse = AggDirection.parse(type);
                ArrayList<String> strings = typeMap.get(parse);
                if (Util.isNull(strings)) {
                    strings = new ArrayList<>();


                }
                if (!strings.contains(aggTableField)) {
                    strings.add(aggTableField);
                }
                typeMap.put(parse, strings);
            } else {
                line = DataHandler.getLine(AggConstant.BI_TABLE_Dimension, AggConstant.BI_Field_Code, aggTableField);
                if (!Util.isNull(line)) {
                    ArrayList<String> strings = typeMap.get(AggDirection.Dimension);
                    if (Util.isNull(strings)) {
                        strings = new ArrayList<>();

                    }
                    String groupid = line.getString(AggConstant.BI_Field_GroupId);
                    if (!strings.contains(groupid)) {
                        strings.add(groupid);
                    }

                    typeMap.put(AggDirection.Dimension, strings);
                }
            }
        }
        return typeMap;
    }






    public List<AggTheme> getAggThemesMapList() {
        return aggThemesMapList;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

}
