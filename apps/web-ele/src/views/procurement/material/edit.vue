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
  <Page :title="$t(router.currentRoute.value.meta.title)">
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

            <ElCol :span="8">
              <ElFormItem label="Notify Party">
                <ElInput v-model="form.name" />
              </ElFormItem>
            </ElCol>

            <ElCol :span="8">
              <ElFormItem label="ALSO NOTIFY">
                <ElInput v-model="form.name" />
              </ElFormItem>
            </ElCol>

            <ElCol :span="8">
              <ElFormItem label="Place Of Receipt">
                <ElInput v-model="form.name" />
              </ElFormItem>
            </ElCol>
            <ElCol :span="8">
              <ElFormItem label="Port of Loading">
                <ElInput v-model="form.name" />
              </ElFormItem>
            </ElCol>

            <ElCol :span="8">
              <ElFormItem label="Port Of Discharge">
                <ElSelect
                  v-model="form.region"
                  placeholder="please select your zone"
                >
                  <ElOption label="Zone one" value="shanghai" />
                  <ElOption label="Zone two" value="beijing" />
                </ElSelect>
              </ElFormItem>
            </ElCol>

            <ElCol :span="8">
              <ElFormItem label="Place Of Delivery">
                <ElInput v-model="form.name" />
              </ElFormItem>
            </ElCol>

            <ElCol :span="8">
              <ElFormItem label="Shipment type">
                <ElSelect
                  v-model="form.region"
                  placeholder="please select your zone"
                >
                  <ElOption label="Zone one" value="shanghai" />
                  <ElOption label="Zone two" value="beijing" />
                </ElSelect>
              </ElFormItem>
            </ElCol>

            <ElCol :span="8">
              <ElFormItem label="Quantity">
                <ElInput v-model="form.name" />
              </ElFormItem>
            </ElCol>

            <ElCol :span="8">
              <ElFormItem label="Inco-Terms">
                <ElSelect
                  v-model="form.region"
                  placeholder="please select your zone"
                >
                  <ElOption label="Zone one" value="shanghai" />
                  <ElOption label="Zone two" value="beijing" />
                </ElSelect>
              </ElFormItem>
            </ElCol>
            <ElCol :span="8">
              <ElFormItem label="Service Type">
                <ElSelect
                  v-model="form.region"
                  placeholder="please select your zone"
                >
                  <ElOption label="Zone one" value="shanghai" />
                  <ElOption label="Zone two" value="beijing" />
                </ElSelect>
              </ElFormItem>
            </ElCol>

            <ElCol :span="16">
              <ElFormItem label="Delivery Address">
                <ElInput v-model="form.name" />
              </ElFormItem>
            </ElCol>

            <ElCol :span="8">
              <ElFormItem label="Types Of Goods">
                <ElSelect
                  v-model="form.region"
                  placeholder="please select your zone"
                >
                  <ElOption label="Zone one" value="shanghai" />
                  <ElOption label="Zone two" value="beijing" />
                </ElSelect>
              </ElFormItem>
            </ElCol>

            <ElCol :span="8">
              <ElFormItem label="CRD">
                <ElDatePicker
                  v-model="form.date1"
                  placeholder="Pick a date"
                  style="width: 100%"
                  type="date"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :span="8">
              <ElFormItem label="Insurance Required ?">
                <ElRadioGroup v-model="form.resource">
                  <ElRadio value="Sponsor">Yes</ElRadio>
                  <ElRadio value="Venue">No</ElRadio>
                </ElRadioGroup>
              </ElFormItem>
            </ElCol>
            <ElCol :span="8">
              <ElFormItem label="Oil Included ?">
                <ElRadioGroup v-model="form.resource">
                  <ElRadio value="Sponsor">Yes</ElRadio>
                  <ElRadio value="Venue">No</ElRadio>
                </ElRadioGroup>
              </ElFormItem>
            </ElCol>
            <ElCol :span="8">
              <ElFormItem label="Batteries included ？">
                <ElRadioGroup v-model="form.resource">
                  <ElRadio value="Sponsor">Yes</ElRadio>
                  <ElRadio value="Venue">No</ElRadio>
                </ElRadioGroup>
              </ElFormItem>
            </ElCol>
            <ElCol :span="8">
              <ElFormItem label="Wooden packing ?">
                <ElRadioGroup v-model="form.resource">
                  <ElRadio value="Sponsor">Yes</ElRadio>
                  <ElRadio value="Venue">No</ElRadio>
                </ElRadioGroup>
              </ElFormItem>
            </ElCol>
          </ElRow>
        </ElForm>

        <ElTable :data="tableData" border style="width: 100%">
          <ElTable.TableColumn type="selection" width="55" />
          <ElTable.TableColumn label="Invoice#" property="invoice_no" />
          <ElTable.TableColumn label="HBl" property="hbl_no">
            <template #default="scope">
              <ElLink type="primary" @click="handleToDetail(scope.row)">
                {{ scope.row.hbl_no }}
              </ElLink>
            </template>
          </ElTable.TableColumn>
          <ElTable.TableColumn label="Invoice Type" property="invoice_type" />
          <ElTable.TableColumn label="Issued" property="issued" />
          <ElTable.TableColumn label="Due" property="due" />
          <ElTable.TableColumn label="Last Payment" property="last_payment" />
          <ElTable.TableColumn label="Status" property="status" />
          <ElTable.TableColumn label="Amount" property="amount" />
          <ElTable.TableColumn label="Balance" property="balance" />
          <ElTable.TableColumn label="Action">
            <template #defult>
              <ElButton link size="small" type="primary"> Remove </ElButton>
            </template>
          </ElTable.TableColumn>
        </ElTable>
        <div class="addItem" @click="handleAddNew">Add New</div>

        <ElForm :model="form" label-position="top" label-width="auto">
          <ElRow :gutter="40">
            <ElCol :span="8">
              <ElFormItem label="Is it necessary for Shunxinda to declare VGM?">
                <ElSelect
                  v-model="form.region"
                  placeholder="please select your zone"
                >
                  <ElOption label="Zone one" value="shanghai" />
                  <ElOption label="Zone two" value="beijing" />
                </ElSelect>
              </ElFormItem>
            </ElCol>
            <ElCol :span="8">
              <ElFormItem
                label="Do you need to declare a manifest for Shunxinda"
              >
                <ElSelect
                  v-model="form.region"
                  placeholder="please select your zone"
                >
                  <ElOption label="Zone one" value="shanghai" />
                  <ElOption label="Zone two" value="beijing" />
                </ElSelect>
              </ElFormItem>
            </ElCol>

            <ElCol :span="8"> <span></span></ElCol>

            <ElCol :span="24">
              <ElFormItem label="Trucking">
                <ElRadioGroup v-model="form.resource">
                  <ElRadio value="Need">Need</ElRadio>
                  <ElRadio value="Unnecessary">Unnecessary</ElRadio>
                </ElRadioGroup>
              </ElFormItem>
            </ElCol>

            <ElCol :span="8">
              <ElFormItem label="Packing Date">
                <ElDatePicker
                  v-model="form.date1"
                  placeholder="Pick a date"
                  style="width: 100%"
                  type="date"
                />
              </ElFormItem>
            </ElCol>

            <ElCol :span="8">
              <ElFormItem label="Is a driver's license required?">
                <ElSelect
                  v-model="form.region"
                  placeholder="please select your zone"
                >
                  <ElOption label="Zone one" value="shanghai" />
                  <ElOption label="Zone two" value="beijing" />
                </ElSelect>
              </ElFormItem>
            </ElCol>

            <ElCol :span="16">
              <ElFormItem label="Pick Up Address">
                <ElInput v-model="form.name" />
              </ElFormItem>
            </ElCol>
            <ElCol :span="24">
              <ElFormItem label="Trucking">
                <ElRadioGroup v-model="form.resource">
                  <ElRadio value="Need">Need</ElRadio>
                  <ElRadio value="Unnecessary">Unnecessary</ElRadio>
                </ElRadioGroup>
              </ElFormItem>
            </ElCol>

            <ElCol :span="8">
              <ElFormItem
                label="Bring your own documents/pay for customs declaration"
              >
                <ElSelect
                  v-model="form.region"
                  placeholder="please select your zone"
                >
                  <ElOption label="Zone one" value="shanghai" />
                  <ElOption label="Zone two" value="beijing" />
                </ElSelect>
              </ElFormItem>
            </ElCol>

            <ElCol :span="8">
              <ElFormItem label="General trade">
                <ElRadioGroup v-model="form.resource">
                  <ElRadio value="Sponsor">Yes</ElRadio>
                  <ElRadio value="Venue">No</ElRadio>
                </ElRadioGroup>
              </ElFormItem>
            </ElCol>
            <ElCol :span="8">
              <ElFormItem label="Transfer">
                <ElRadioGroup v-model="form.resource">
                  <ElRadio value="Sponsor">Yes</ElRadio>
                  <ElRadio value="Venue">No</ElRadio>
                </ElRadioGroup>
              </ElFormItem>
            </ElCol>
            <ElCol :span="8">
              <ElFormItem label="manual">
                <ElRadioGroup v-model="form.resource">
                  <ElRadio value="Sponsor">Yes</ElRadio>
                  <ElRadio value="Venue">No</ElRadio>
                </ElRadioGroup>
              </ElFormItem>
            </ElCol>

            <ElCol :span="8">
              <ElFormItem label="Freight & Charges">
                <ElSelect
                  v-model="form.region"
                  placeholder="please select your zone"
                >
                  <ElOption label="Zone one" value="shanghai" />
                  <ElOption label="Zone two" value="beijing" />
                </ElSelect>
              </ElFormItem>
            </ElCol>
            <ElCol :span="8">
              <ElFormItem label="Prepaied">
                <ElSelect
                  v-model="form.region"
                  placeholder="please select your zone"
                >
                  <ElOption label="Zone one" value="shanghai" />
                  <ElOption label="Zone two" value="beijing" />
                </ElSelect>
              </ElFormItem>
            </ElCol>
            <ElCol :span="8">
              <ElFormItem label="collect">
                <ElSelect
                  v-model="form.region"
                  placeholder="please select your zone"
                >
                  <ElOption label="Zone one" value="shanghai" />
                  <ElOption label="Zone two" value="beijing" />
                </ElSelect>
              </ElFormItem>
            </ElCol>
          </ElRow>
        </ElForm>
        <div class="mt-[20px] text-[16px] font-[700] text-[#171629]">
          Precautions
        </div>

        <div class="text-[14px] font-[400] leading-[24px] text-[#000]">
          1、托运单是托运货物、安排运输和出具提单的依据，各项内容必须认真填写。
        </div>
        <div class="text-[14px] font-[400] leading-[24px] text-[#000]">
          2、货物的各项资料：唛头、件数和英文包装单位、中英文货名、重量、尺码等必须填全。
        </div>
        <div class="text-[14px] font-[400] leading-[24px] text-[#000]">
          3、运费与附加费栏，默认按双方协议价。
        </div>
        <div class="text-[14px] font-[400] leading-[24px] text-[#000]">
          4、可否转船、可否分批，未说明的一律视作可转船、可分批；运费预付、到付栏不填的，一律按预付处理；运输条款不填的，一律视作CY-CY条款；运费支付人不填的，托运人是当然的运费支付人。
        </div>
        <div class="text-[14px] font-[400] leading-[24px] text-[#000]">
          5、危险品托运，请订舱时告知，必须提供产品说明书，包装容器使用性能鉴定书。
        </div>
        <div class="text-[14px] font-[400] leading-[24px] text-[#000]">
          6、托运人一栏，必须由经办人签名及盖章。
        </div>
        <div class="text-[14px] font-[400] leading-[24px] text-[#000]">
          7、因托运单填写错误或资料不全引起的货物不能及时出运、运错目的地、提单错误不能结汇，不能提货等而产生的一切责任、风险、纠纷、费用等概由托运人承担。
        </div>
        <div class="text-[14px] font-[400] leading-[24px] text-[#000]">
          8、顺欣达作为货运代理人，对于运输过程中货物异常（破损，丢货，少货，卡车转运延误等）没有赔偿的义务，因此我司强烈建议所有出口货物均提前购买保险，以减少可能产生损失的风险，我司可以协助客户向船司提出索赔，索赔不得影响运费的正常支付，不得以索赔为由扣压运费！！
        </div>
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
