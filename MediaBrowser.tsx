import React from "react";
import { Row, Col, Tabs, Modal, Button } from "antd";
import {
  FolderOutlined,
  FolderOpenOutlined,
  TableOutlined
} from "@ant-design/icons";

import styles from './styles';

const { TabPane } = Tabs;

import {
  ItemInterface,
  TabInterface,
  PropsInterface,
  StateInterface
} from "./schema";

export default class MediaBrowser extends React.Component<
  PropsInterface,
  StateInterface
> {
  myInput: any;
  isChanged: boolean;
  lastValue: string;

  public static defaultProps: Partial<PropsInterface> = {
    dataSource: []
  };

  constructor(props: PropsInterface) {
    super(props);

    let tabKeyActive = "";
    let itemKeyActive = "";

    if (props.dataSource && props.dataSource.length > 0) {
      tabKeyActive = props.dataSource[0].key;

      if (props.dataSource[0].items && props.dataSource[0].items.length > 0) {
        itemKeyActive = props.dataSource[0].items[0].key;
      }
    }

    const itemActive = {
      key: "",
      title: "",
      url: ""
    };

    this.state = {
      isModalVisible: false,
      tabKeyActive,
      itemKeyActive,
      itemActive
    };

    this.isChanged = false;
  }

  getItemByKey = (key: string) => {
    const blankItem = {
      key: "",
      title: "",
      url: ""
    };

    for (const tab of this.props.dataSource) {
      const items = tab.items?tab.items:[];

      if (items.length > 0) {
        const itemsByItemKey = items.filter(
          (item: ItemInterface) => item.key === key
        );

        if (itemsByItemKey.length > 0) {
          return itemsByItemKey[0];
        }
      }
    }

    return blankItem;
  };

  getItemActive = () => {
    const blankItem = {
      key: "",
      title: "",
      url: ""
    };
    const dataSourceByTabKeyActive = this.props.dataSource.filter(
      (tab: TabInterface) => tab.key === this.state.tabKeyActive
    );

    if (dataSourceByTabKeyActive.length > 0) {
      const items = dataSourceByTabKeyActive[0].items
        ? dataSourceByTabKeyActive[0].items
        : [];

      if (items.length > 0) {
        const itemsByItemKeyActive = items.filter(
          (item: ItemInterface) => item.key === this.state.itemKeyActive
        );

        if (itemsByItemKeyActive.length > 0) {
          return itemsByItemKeyActive[0];
        } else {
          return blankItem;
        }
      }
    } else {
      return blankItem;
    }
  };

  handleBrowse = () => {
    this.setState({
      isModalVisible: true
    });
  };

  handleTabSelect = (tabKeyActive: string) => {
    this.setState({
      tabKeyActive
    });
  };

  handleItemSelect = (itemKeyActive: string) => {
    this.setState({
      itemKeyActive
    });
  };

  handleOk = () => {
    this.isChanged = true;

    this.setState({
      itemActive: this.getItemActive(),
      isModalVisible: false
    });
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false
    });
  };

  componentDidMount() {
    this.setState({
      itemActive: this.getItemByKey(this.props.value),
    });
  }

  componentDidUpdate() {
    if (this.isChanged && this.props.onChange) {
      const event = { target: this.myInput };
      
      event.target.value = this.state.itemActive.key;

      this.props.onChange(event);
      this.isChanged = false;
    }    
  }

  render() {
    return (
      <React.Fragment>
        <section>
          <figure
            style={styles.preview.figure}
          >
            Preview
            { 
              (this.state.itemActive.key) &&
              <img 
                src={this.state.itemActive.url} 
                alt={this.state.itemActive.title} 
                style={styles.preview.img}
              />
            }
          </figure>
          <Button
            icon={<TableOutlined />}
            onClick={this.handleBrowse}
            style={styles.preview.button}
          >
            Browse
          </Button>
        </section>

        <Modal
          title={"Media Browser"}
          width={1000}
          bodyStyle={styles.modal.wrapper}
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Tabs tabPosition={"left"} onChange={this.handleTabSelect}>
            {this.props.dataSource.map((tab: TabInterface) => {
              return (
                <TabPane
                  tab={
                    <section style={styles.modal.tab.wrapper}>
                      {tab.key === this.state.tabKeyActive ? (
                        <FolderOpenOutlined
                          style={styles.modal.tab.icon}
                        />
                      ) : (
                        <FolderOutlined
                          style={styles.modal.tab.icon}
                        />
                      )}

                      <br />
                      {tab.title}
                    </section>
                  }
                  key={tab.key}
                  style={styles.modal.tab.body.wrapper}
                >
                  <Row gutter={[8, 8]}>
                    {tab.items.map((item: ItemInterface) => {
                      const aStyle = {...styles.modal.tab.body.a};
                      const figureStyle = {...styles.modal.tab.body.figure};
                      const imgStyle = {...styles.modal.tab.body.img};

                      if (item.key === this.state.itemKeyActive) {
                        aStyle.outline = "solid whitesmoke 3px";
                        imgStyle.opacity = "100%";
                      }

                      return (
                        <Col xs={12} sm={8} lg={6}>
                          <a
                            onClick={() => this.handleItemSelect(item.key)}
                            onDoubleClick={this.handleOk}
                            style={aStyle}
                            href="javascript:"
                          >
                            <figure style={figureStyle}>
                              <img
                                src={item.url}
                                alt={item.title}
                                style={imgStyle}
                              />
                            </figure>
                          </a>
                        </Col>
                      );
                    })}
                  </Row>
                </TabPane>
              );
            })}
          </Tabs>
        </Modal>

        <input
          id={this.props.id}
          name={this.props.name}
          value={this.props.value}
          ref={(el: any) => {
            this.myInput = el;
          }}
          onClick={() => {
            const event = new Event("input", { bubbles: true });
            this.myInput.dispatchEvent(event);
          }}
          type="hidden"
        />
      </React.Fragment>
    );
  }
}
