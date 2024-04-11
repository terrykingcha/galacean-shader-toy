import React from "react";
import { Layout, theme, Menu, MenuProps, Select, SelectProps } from "antd";
import { createRuntime, selectShader, selectMode } from "./runtime";
import shaderLoader from "./shaderlab";

const { Header, Sider, Footer, Content } = Layout;

const shaderMenu = Object.keys(shaderLoader).map((key) => ({
  key,
  label: key,
}));

function App() {
	React.useEffect(() => {
		createRuntime();
	}, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onShaderMenuClick: MenuProps['onClick'] = (info) => {
    selectShader(info.key);
  };

  const onModeChange: SelectProps['onChange'] = (value) => {
    selectMode(value);
  }

	return (
    <Layout style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
      <Header style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
        <div className="demo-logo" />
      </Header>
      <Content style={{ padding: '0 48px', flex: 1 }}>
        <Layout style={{ padding: '24px 0', height: '100%', boxSizing: 'border-box', background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              onClick={onShaderMenuClick}
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['Lines']}
              style={{ height: '100%' }}
              items={shaderMenu}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280, position: 'relative' }}>
            <canvas id="canvas" style={{ width: "100%", height: "100%" }}></canvas>
            <Select style={{ position: 'absolute', left: '60px', top: '20px'}}
              defaultValue="Sphere"
              onChange={onModeChange}
              options={[
                { value: 'sphere', label: 'Sphere' },
                { value: 'plane', label: 'Plane' },
              ]}
            />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center', height: '64px' }}>Galacean Engine</Footer>
    </Layout>
	);
}

export default App;
