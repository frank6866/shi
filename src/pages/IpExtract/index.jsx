import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Drawer } from "antd";
import React, { useState, useRef } from "react";
import { useIntl, FormattedMessage } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import { ModalForm, ProFormText, ProFormTextArea } from "@ant-design/pro-form";
import ProDescriptions from "@ant-design/pro-descriptions";

import { Component } from "react";
import { Row, Col, Input } from "antd";
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
        <Row>
          <Col span={11}>
            <Row>
              <span>数据源</span>
            </Row>
            <Row>
              <TextArea
                placeholder="包含IP的文本"
                autoSize={{ minRows: 30, maxRows: 30 }}
                allowClear
                style={{
                  marginRight: 200,
                }}
                onChange={this.onAChange}
              />
            </Row>
          </Col>
          <Col span={2}>
            <Row>>>></Row>
            <Row>
              <Checkbox.Group
                options={this.checkOptions}
                defaultValue={["unique_sort"]}
                onChange={this.onOptionsChange}
              />
            </Row>
            <Row>>>></Row>
          </Col>
          <Col span={11}>
            <Row>
              <span>IP列表</span>
              <span>{this.state.resultLength}</span>
              <span>{this.state.processTime}</span>
            </Row>
            <Row>
              <TextArea
                autoSize={{ minRows: 30, maxRows: 30 }}
                style={{}}
                value={this.state.result}
              />
            </Row>
          </Col>
        </Row>
      </PageContainer>
    );
  }
}

export default AppComponent;
