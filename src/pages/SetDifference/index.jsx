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

const { TextArea } = Input;

class AppComponent extends Component {
  constructor(props) {
    super(props); // 调用父类的构造函数，改变this指向
    this.state = {
      result: "",
    };
    this.aSetStr = "";
    this.bSetStr = "";
  }

  onAChange = (e) => {
    this.aSetStr = e.target.value;
    this.compute();
  };

  onBChange = (e) => {
    this.bSetStr = e.target.value;
    this.compute();
  };

  compute = () => {
    // 按回车分割a，得到列表
    const aList = this.aSetStr.split(/[,|\n]/);
    const tmpAList = aList.filter((item) => item.trim() != "");
    const aLines = tmpAList.map((item) => item.trim());
    this.setState({
      aLength: aLines.length,
    });

    // 按回车分割a，得到列表
    const bList = this.bSetStr.split(/[,|\n]/);
    const tmpBList = bList.filter((item) => item.trim() != "");
    const bLines = tmpBList.map((item) => item.trim());
    this.setState({
      bLength: bLines.length,
    });
    console.log(typeof bLines);
    if (aLines && aLines && aLines.length != 0 && bLines.length != 0) {
      const a = new Set(aLines);
      const b = new Set(bLines);
      const sub = Array.from(new Set([...a].filter((x) => !b.has(x))));
      this.setState({
        resultLength: sub.length,
        result: sub.join("\n"),
      });
    }
  };

  render() {
    return (
      <PageContainer>
        <Row>
          <Col span={24}>col</Col>
        </Row>
        <Row>
          <Col span={7}>
            <Row>
              <span>集合A</span>
              <span>{this.state.aLength}</span>
            </Row>
            <Row>
              <TextArea
                placeholder="比如：审核cmdb中的ip列表"
                autoSize={{ minRows: 30, maxRows: 30 }}
                allowClear
                style={{
                  marginRight: 200,
                }}
                onChange={this.onAChange}
              />
            </Row>
          </Col>
          <Col span={1}>
            <Row>减去</Row>
            <Row>-</Row>
          </Col>
          <Col span={7}>
            <Row>
              <span>集合B</span>
              <span>{this.state.bLength}</span>
            </Row>
            <Row>
              <TextArea
                placeholder="比如：审核配置系统av中的ip列表"
                autoSize={{ minRows: 30, maxRows: 30 }}
                allowClear
                style={{}}
                onChange={this.onBChange}
              />
            </Row>
          </Col>
          <Col span={1}>
            <Row>等于</Row>
            <Row>=</Row>
          </Col>
          <Col span={7}>
            <Row>
              <span>A-B</span>
              <span>{this.state.resultLength}</span>
              <span>{this.state.processTime}</span>
            </Row>
            <Row>
              <TextArea
                placeholder="在cmdb中，不在配置系统av中的ip"
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
