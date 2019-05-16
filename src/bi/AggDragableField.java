package bi;

import bi.define.AggDimensionsContainer;
import bi.define.AggMainFieldContainer;
import bi.define.Dimension;
import bi.define.Measurment;
import foundation.util.Util;

/**
 * @author kimi
 * @description 前端可拖拽字段包装类
 * @date 2019-05-05 10:12
 */


public class AggDragableField {
    private Dimension dimension;
    private String field;
    private EDragableFieldType type;
    private String tableName;


    public AggDragableField(String field, boolean isDimension) {
        this.field = field;

        if (!isDimension) {
            checkIsMainField(field);
            type = EDragableFieldType.filter;
            return;
        }

        Dimension dimension = AggDimensionsContainer.getDimensionByCode(field);

        if (!Util.isNull(dimension)) {
            type = EDragableFieldType.agg;
            this.dimension = dimension;
        } else {
            checkIsMainField(field);
            /*if (!checkIsPeroid(field)) {

            }*/
        }
    }

    private boolean checkIsPeroid(String field) {
        Dimension peroidDimension = AggDimensionsContainer.getInstance().getPeroidDimension(field);
        if (Util.isNull(peroidDimension)) {
            return false;
        }
        type = EDragableFieldType.agg;
        this.dimension = peroidDimension;
        return true;
    }

    private void checkIsMainField(String field) {
        String tableName = AggMainFieldContainer.getTableName(field);
        if (Util.isNull(tableName)) {
            Measurment measurmentByCode = AggDimensionsContainer.getMeasurmentByCode(field);
            if (Util.isNull(measurmentByCode)) {
                type = EDragableFieldType.unknown;
            } else {
                type = EDragableFieldType.measurment;
            }

        } else {
            type = EDragableFieldType.main;
            this.tableName = tableName;
        }
    }

    public Dimension getDimension() {
        return dimension;
    }

    public String getField() {
        return field;
    }

    public EDragableFieldType getType() {
        return type;
    }

    public String getTableName() {
        return tableName;
    }

    @Override
    public String toString() {
        return field.toLowerCase();
    }

    @Override
    public int hashCode() {
        return field.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof AggDragableField) {
            return  this.field.equalsIgnoreCase(((AggDragableField) obj).field);
        }
        return super.equals(obj);
    }
}
