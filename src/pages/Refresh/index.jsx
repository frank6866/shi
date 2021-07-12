import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  message,
  Drawer,
  Row,
  Col,
  Card,
} from "antd";
import React, { useState, useRef } from "react";
import { useIntl, FormattedMessage } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import { ModalForm, ProFormText, ProFormTextArea } from "@ant-design/pro-form";
import ProDescriptions from "@ant-design/pro-descriptions";

import { Component } from "react";
import { Checkbox } from "antd";

const { TextArea } = Input;

const ipRegex = require("ip-regex");

class AppComponent extends Component {
  constructor(props) {
    super(props); // 调用父类的构造函数，改变this指向
    this.state = {
      result: "",
      processTime: "",
    };
    this.aSetStr = "";
    this.checkOptions = [{ label: "去重&排序", value: "unique_sort" }];
    this.checkedValues = ["unique_sort"];
  }

  onAChange = (e) => {
    this.aSetStr = e.target.value;
    this.compute();
  };

  compute = () => {
    // 按回车分割a，得到列表
    const aList = this.aSetStr.split(/[,|\n]/);
    const tmpAList = aList.filter((item) => item.trim() != "");

    let resultLines = [];
    tmpAList.map((line) => {
      const lineIps = line.match(ipRegex());
      //       console.log(lineIps);
      if (lineIps && lineIps.length != 0) {
        resultLines = resultLines.concat(lineIps);
      }
    });

    //     console.log(resultLines);
    if (this.checkedValues && this.checkedValues.includes("unique_sort")) {
      const set = new Set(resultLines);
      resultLines = [...set];
      resultLines.sort();
    }

    this.setState({
      processTime: new Date().toLocaleString(),
    });

    if (resultLines && resultLines.length) {
      this.setState({
        resultLength: resultLines.length,
        result: resultLines.join("\n"),
      });
    }
  };

  onOptionsChange = (checkedValues) => {
    //     console.log('checked = ', checkedValues);
    this.checkedValues = checkedValues;
    this.compute();
  };

  render() {
    return (
      <PageContainer>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          // layout="vertical"
          // initialValues={{ size: componentSize }}
          // onValuesChange={onFormLayoutChange}
          // size={componentSize as SizeType}
        >
          <Row>
            {/*date*/}
            <Form.Item name="t" label="t">
              <DatePicker />
            </Form.Item>
          </Row>
          <Card title="zs">
            <Row>
              <Form.Item name="t" label="t">
                <Input />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item name="t" label="t">
                <Input />
              </Form.Item>
            </Row>
          </Card>

          <Card title="wx">
            <Row>
              <Form.Item name="lqt" label="t">
                <Input />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item name="yej" label="t">
                <Input />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item name="zq" label="t">
                <Input />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item name="jjie" label="t">
                <Input />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item name="nf" label="t">
                <Input />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item name="90" label="t">
                <Input />
              </Form.Item>
            </Row>
          </Card>

          <Card title="zfb">
            <Row>
              <Form.Item name="yeb" label="t">
                <Input />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item name="dfx" label="t">
                <Input />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item name="bnt" label="t">
                <Input />
              </Form.Item>
            </Row>
          </Card>

          <Card title="cb">
            <Row>
              {/*cb*/}
              <Form.Item name="nf" label="t">
                <Input />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item name="90" label="t">
                <Input />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item name="bnt" label="t">
                <Input />
              </Form.Item>
            </Row>
          </Card>

          <Card title="less">
            <Row>
              <Form.Item name="wx-zq" label="t" initialValue="0">
                <Input />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item name="wx-jji" label="t" initialValue="0">
                <Input />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item name="zfb-dfx" label="t" initialValue="0">
                <Input />
              </Form.Item>
            </Row>
          </Card>

          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </PageContainer>
    );
  }
}

export default AppComponent;
