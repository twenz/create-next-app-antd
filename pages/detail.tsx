import { Form, InputNumber, Switch } from "antd";

export default function Home() {
  return (
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
      <Form.Item label="数字输入框">
        <InputNumber min={1} max={10} defaultValue={3} />
        <span className="ant-form-text"> 台机器</span>
        <a href="https://ant.design">链接文字</a>
      </Form.Item>
      <Form.Item label="开关">
        <Switch defaultChecked />
      </Form.Item>
    </Form>
  );
}
