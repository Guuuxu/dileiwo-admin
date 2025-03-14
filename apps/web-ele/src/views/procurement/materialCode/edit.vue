<script lang="ts" setup>
import type { Data } from '@vben/types';

import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import {
  ElButton,
  ElCard,
  ElCol,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElRow,
  ElSelect,
  ElTable,
} from 'element-plus';

type listType = Data['list'];
type ExtractedListType = listType extends (infer U)[] ? U : never;
const router = useRouter();

let tableData: listType = [
  {
    amount: '2016-05-04',
    balance: 'Aleyna Kutzner',
    currency: 1,
    due: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
    hbl_no: 'SXDE1234',
    invoice_no: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
    id: 1,
    invoice_type: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
    issued: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
    path: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
    last_payment: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
    sea_order_id: 1,
    status: 1,
  },
];

// function getData() {
//   billList({
//     page: currentPage.value,
//     per_page: pageSize.value,
//   }).then((res) => {
//     tableData = res.data.list;
//   });
// }

// getData();
function handleAddNew() {
  tableData.push({});
}
function handleToDetail(row: ExtractedListType) {
  console.log(`🚀 ~ handleToDetail ~ row:`, row);
  router.push({
    path: `/billing/view`,
    query: {
      id: row.hbl_no,
    },
  });
}
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});
</script>
<template>
  <Page title="Additional information">
    <ElCard>
      <template #default>
        <ElForm :model="form" label-position="top" label-width="auto">
          <ElRow :gutter="40">
            <ElCol :span="8">
              <ElFormItem label="Quotation number">
                <ElInput v-model="form.name" />
              </ElFormItem>
            </ElCol>
            <ElCol :span="8">
              <ElFormItem label="Shipper">
                <ElInput v-model="form.name" />
              </ElFormItem>
            </ElCol>

            <ElCol :span="8">
              <ElFormItem label="Consignee">
                <ElInput v-model="form.name" />
              </ElFormItem>
            </ElCol>
          </ElRow>
        </ElForm>
      </template>
    </ElCard>
    <template #footer>
      <div class="flex w-full justify-end">
        <div>
          <ElButton>Upload booking letter</ElButton>
          <ElButton type="primary">
            Confirm and download the booking letter
          </ElButton>
        </div>
      </div>
    </template>
  </Page>
</template>
<style lang="scss" scoped>
.addItem {
  width: 100%;
  padding: 6px 0;
  margin-top: 10px;
  margin-bottom: 40px;
  font-size: 14px;
  color: #000;
  text-align: center;
  cursor: pointer;
  border: 1px solid #dcdcdc;
}
</style>
