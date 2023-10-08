import React, { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Card,
  Button,
  Input,
  Space,
  Tooltip,
  Alert,
  Divider,
  List,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  clearErrorMessage,
  setIsDetailsLoading,
} from "./store/userSlice";
import { fetchUserByName, fetchUserRepos } from "./store/userActions";

const App = () => {
  const widthXHeight = 100;
  const isDetailsLoading = useSelector(({ user }) => user.isDetailsLoading);
  const errorMessage = useSelector(({ user }) => user.errorMessage);
  const details = useSelector(({ user }) => user.details);
  const repos = useSelector(({ user }) => user.repos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setName(""));
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(setName(e.target.value));
  };

  const handleSearch = () => {
    dispatch(clearErrorMessage());
    dispatch(setIsDetailsLoading(true));
    dispatch(fetchUserByName());
    dispatch(fetchUserRepos());
  };

  return (
    <>
      <Space
        direction="vertical"
        style={{ display: "flex", width: "100%" }}
        align="center"
      >
        <Card
          title={"Search Github User"}
          bordered={true}
          style={{ maxWidth: 1920 }}
          loading={isDetailsLoading}
        >
          <Space direction="vertical">
            {errorMessage && <Alert message={errorMessage} type="error" />}
            <Space direction="horizontal">
              <Input
                placeholder="e.g. facebook"
                onChange={handleChange}
                onPressEnter={handleSearch}
              />
              <Tooltip title="search">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                />
              </Tooltip>
            </Space>
          </Space>
        </Card>
        {details && (
          <Card title={`'${details.name}' details`} style={{ width: 300 }}>
            <Space direction="horizontal" style={{ display: "flex" }}>
              <img
                src={details.avatar_url}
                alt={details.name}
                width={widthXHeight}
                height={widthXHeight}
              />
              <h2>{details.name}</h2>
            </Space>
            <p>{details.bio}</p>
            <p>{details.location}</p>
            <Divider orientation="left">User repositories</Divider>
            <List
              bordered
              dataSource={repos}
              renderItem={(item) => <List.Item>{item.name}</List.Item>}
            />
          </Card>
        )}
      </Space>
    </>
  );
};

export default App;
