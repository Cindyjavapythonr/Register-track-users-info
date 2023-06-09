import { SkinOutlined, BarChartOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { UserProvider } from './mainpagefunctions/userContext';
import { UserDetails } from './mainpagefunctions/userDetails';
import { UserDetailsDisplay } from './mainpagefunctions/userDetailsDisplay';
import { ItemDetails } from './mainpagefunctions/itemDetails';
import { CategoryAndKitsDetails } from './mainpagefunctions/category&kitsDetails';
import { AidCKDetail } from './mainpagefunctions/c&kDetails';
import { RecipientRequests } from './mainpagefunctions/userRequests';
import { AboutUs } from './mainpagefunctions/aboutus';
import { ReceiveDDetails } from './mainpagefunctions/receiveDDetailsDisplay';
import { DonorDetails } from './mainpagefunctions/donorDetails';
import logo from './images/vr1_logo.png';

const { Header, Content, Sider, Footer } = Layout;
const labels = ['Home', 'Make a request', 'Make a donation', 'About us'];

// Set the header content
const menufuncs = ["/Home", "/RRequest:AidC&K", "/ReceiveDonorDetails", "/Aboutus"].map((route, key) => ({
  label: labels[key],
  route
}));

// Set the sider content
const siderlabels = ['Aid Recipients', 'Aid Donors', 'Aid Categories & Kits', 'Aid Items'];
const icons = [UserOutlined, UserOutlined, SkinOutlined, SkinOutlined];
const sider = ["/AidRecipients", "/AidDonors", "/AidCategoriesAndKits", "/AidItems" ].map((route, index) => {
  const key = String(index);
  return {
    icon: React.createElement(icons[key]),
    label: siderlabels[key],
    route
  };
});

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <UserProvider>
      <Router>
        <Layout>
          <Header className="header" style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              width: '100%',
            }} >
            <div className="logo" style={{
                float: 'left',
                width: 40,
                height: 31,
                margin: '13px 16px 16px 0',
                background: 'rgba(255, 255, 255, 0.2)',
                backgroundImage: {logo}, 
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}>
              <img src={logo} width="40" height="40" />
            </div>
            <Menu theme="dark" mode="horizontal" 
              style={{
                width: 500
              }}
              defaultSelectedKeys={['O']} 
              items={menufuncs.map(({ label, route }) => ({ 
                key: route, 
                label: <Link to={route}>{label}</Link> 
              }))}
            />
            {/* <p>Logged in as Staff</p> */}
          </Header>
          <Layout>
            <Sider
              width={250}
              style={{
                position: 'sticky',
                background: colorBgContainer,
              }}
            >
              <Menu
                mode="inline"
                style={{
                  position: "static",
                  overflow: "auto",
                  height: '100%',
                  borderRight: 0,
                }}
                items={sider.map(({ icon, label, route }) => ({
                  key: route, icon, 
                  label: <Link to={route}>{label}</Link>
                }))}
              />
            </Sider>

            <Layout
              style={{
                padding: '0 24px 24px',
              }}
            >
              <Breadcrumb
                style={{
                  margin: '20px 0',
                }}
              >
              </Breadcrumb>

              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 480,
                  background: colorBgContainer,
                  textAlign: 'center',
                  fontSize: 40
                }}
              >
                <Routes>

                  <Route path="/Home" element={<h1>Welcome to VR1Family <br /> <br /> We are here to help you out of the mess</h1>} />
                  <Route path="/AidRecipients" element={<UserDetails />} />
                  <Route path="/AidDonors" element={<DonorDetails />} />
                  <Route path="/AidItems" element={<ItemDetails />} />
                  <Route path="/AidItems/details" element={<UserDetailsDisplay />} />
                  <Route path="/ReceiveDonorDetails" element={<ReceiveDDetails />} />
                  <Route path="/RRequest" element={<RecipientRequests />} />
                  <Route path="/AidCategoriesAndKits" element={<CategoryAndKitsDetails />} />
                  <Route path="/RRequest:AidC&K" element={<AidCKDetail />} />
                  <Route path="/AboutUs" element={<AboutUs />} />
                  
                </Routes>
              </Content>

              <Footer style={{
                textAlign: 'center'
              }}>
                VR1Family Charity Aid @2023 Created by Architects4U
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    </UserProvider>
      );
    };

export default App;





//"/AidDonors", "/AidItems", "/RRequest", "/DRequest"

// #components-layout-demo-top-side-2 .logo {
//   float: left;
//   width: 120px;
//   height: 31px;
//   margin: 16px 24px 16px 0;
//   background: rgba(255, 255, 255, 0.3);
// }

// .ant-row-rtl #components-layout-demo-top-side-2 .logo {
//   float: right;
//   margin: 16px 0 16px 24px;
// }



