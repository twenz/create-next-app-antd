import { Form, InputNumber, Switch } from "antd";

export default function Home() {
  return (
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
      <Form.Item label="数字输入框">
        <InputNumber min={1} max={10} defaultValue={3} />
        <span className="ant-form-text"> Machine</span>
        <a href="https://ant.design">Link</a>
      </Form.Item>
      <Form.Item label="Switch">
        <Switch defaultChecked />
      </Form.Item>
    </Form>
  );
}
