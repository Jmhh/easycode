<template>
  <div>
    <el-table style="width: 100%" border :data="tableData">
      <template v-for="(item,index) in tableHead">
        <el-table-column
          :prop="item.column_name"
          :label="item.column_comment"
          :key="index"
          v-if="item.column_name != 'id'"
        ></el-table-column>
      </template>
    </el-table>

    <el-form :rules="ruleProcessForm.rules" :model="ruleProcessForm" ref="formProcess">
      <el-table :data="ruleProcessForm.processData" tooltip-effect="dark" style="width: 100%">
        <el-table-column label="工序名称" prop="processName">
          <template slot-scope="scope">
            <el-form-item
              :prop="'processData.' + scope.$index + '.processName'"
              :rules="ruleProcessForm.rules.processName"
            >
              <el-select
                v-model="scope.row.processName"
                @visible-change="getProcessNameInfo"
                @change="processNameChange(scope.row)"
                placeholder="工序名称"
              >
                <el-option
                  v-for="item in processNameList"
                  :key="item.processId"
                  :label="item.processName"
                  :value="item.processName"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
//prop动态绑定例子
/* 
:prop="'Prices.'+ index +'.Start'"
:prop="'tableData.' + scope.$index + '.input'"
:prop='"startDate" + scope.row.id'
 */

export default {
  name: "",
  props: [""],
  data() {
    return {
      // 表头数据
      tableHead: [
        {
          column_name: "column_name",
          column_comment: "姓名"
        },
        {
          column_name: "column_age",
          column_comment: "年龄"
        },
        {
          column_name: "column_sex",
          column_comment: "性别"
        }
      ],
      // 表格数据
      tableData: [
        {
          column_age: "3",
          column_name: "鞠婧祎",
          column_sex: "女"
        },
        {
          column_age: "25",
          column_name: "魏大勋",
          column_sex: "男"
        },
        {
          column_age: "18",
          column_name: "关晓彤",
          column_sex: "女"
        }
      ],
      formProcess: {
        processName: ""
      },
      ruleProcessForm: {
        rules: {
          processName: [
            { required: true, message: "请选择工序名称", trigger: "change" }
          ]
        },
        processData: []
      }
    };
  },

  components: {},

  created() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
</style>