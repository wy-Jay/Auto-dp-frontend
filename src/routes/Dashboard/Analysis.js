import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Select, Checkbox, Button, Modal, Input } from 'antd';
import styles from './Analysis.less';

const {Option} = Select;
const CheckboxGroup = Checkbox.Group;

const dpParams = ['rd','qa','online']

@connect(({ analysis }) => ({
  analysis,
}))
export default class Analysis extends Component {
  state = {
    checkedIpList: [],
    visible: false,
    confirmLoading: false,
    ipList: [],
    addIpList: [], //新增项目的ip
    branchList: [],
    projectId: '',
    branchName: '',
    gitUrl: '',
    compileParam: ''
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'analysis/fetch',
    });
  }

  componentWillUnmount() {
  }

  onChangeChooseIp = (checkedIpList) => {
    console.log(checkedIpList)
    // const { ipList } = this.state
    this.setState({
      checkedIpList,
    });
  }

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  handleAdd = () => {
    this.setState({
      visible: true,
    });
  }

  handleAddIp = () => {
    let list = this.state.ipList.push ({value: ''})
    this.setState ( {
      ipList: list
    } )
  }

  handleChangeProject = ( value ) =>{
    const { analysis } = this.props
    const { projectList } = analysis
    projectList.forEach(ele => {
      if ( ele.projectId == value ) {
        this.setState ( {
          branchList : ele.branchList,
          ipList: ele.ipList,
          projectId: ele.projectId,
        } )
      }
    });
  }

  handleChangeBranch = (value) => {
    this.setState ( {
      branchName: value,
    } )
  }

  handleChangeParams = (value) => {
    this.setState ( {
      compileParam: value,
    } )
  }

  handleChangeGit = ( val ) => {
    this.setState ( {
      gitUrl: val,
    } )
  }

  handleChangeIp = ( val, item ) => {
    console.log(val, item)
  }

  handleDeployJar = () => {
    const { dispatch } = this.props;
    const { projectId, branchName } = this.state
    const params = {
      projectId,
      branchName,
    }
    dispatch({
      type: 'analysis/deployJar',
    }, params );
  }

  handleDeployProject = () => {
    const { projectId, branchName, compileParam, checkedIpList } = this.state
    const { dispatch } = this.props;
    const params = {
      projectId,
      branchName,
      compileParam,
      checkedIpList,
    }
    dispatch({
      type: 'analysis/deployProject',
    }, params);
  }

  render() {
    const { analysis } = this.props
    const {visible, confirmLoading, ipList, addIpList, branchList, checkedIpList} = this.state
   return (
     <div className={styles.main}>
        <Row className={styles.top}>
          <Col span={12} className={styles.left}>
            <div className={styles.leftTop}>
              <div className={styles.item}>
                <span>项目：</span>
                <Select style={{ width: 160 }}  onChange={this.handleChangeProject}>
                  {
                    analysis.projectList.map ( ( item, index ) => {
                      return <Option value={item.projectId} key={ index }>{item.projectName}</Option>
                    } )
                  }
                </Select>
                {/* <Button className={styles.ml_15} onClick = {this.handleAdd}>添加</Button> */}
              </div>
              <div className={styles.item}>
                <span>分支：</span>
                <Select style={{ width: 160 }} onChange= {this.handleChangeBranch}>
                  {
                    branchList.map ( ( item, index ) => {
                      return <Option value={item} key={ index }>{item}</Option>
                    } )
                  }
                </Select >
              </div> 
              <div className={styles.item}>
                <span>参数：</span>
                <Select style={{ width: 160 }} onChange={this.handleChangeParams}>
                  {
                    dpParams.map ( ( item, index ) => {
                      return <Option value={item} key={ index }>{item}</Option>
                    } )
                  }
                </Select>
              </div>
            </div>
            <Button type='primary' className={styles.ml_20} onClick={this.handleDeployJar}>发布Jar包</Button>
            <Button type='primary' className={styles.ml_15} onClick={this.handleDeployProject}>编译并发布</Button>
          </Col>
          <Col span={12} className={styles.right}>
              <div className={styles.item}>
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>机器列表：</div>
                <CheckboxGroup options={ipList} value={checkedIpList} onChange={this.onChangeChooseIp} />
              </div>
          </Col>
        </Row>
        <div className={styles.divide}>
          <Row>
            <Col span={24}>
                <div className={styles.item}>输出信息:</div>
                <div className={styles.outPanel}></div>
            </Col>
          </Row>
        </div>
        <Modal title="添加项目"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <div>
            <div className={styles.item}><span className={styles.label}>git地址：</span>
              <Input style={{ width: 300 }} onChange={this.handleChangeGit}/>
            </div>
            <div className={styles.item}><span className={styles.label}>IP：</span>
              {
                addIpList.map ( item => {
                  return <Input style={{ width: 300 }} onChange={ ( val ) => this.handleChangeIp ( val, item )}/>
                } )
              }
              <Button className={styles.ml_15} onClick = {this.handleAddIp}>添加</Button>
            </div>
          </div>
        </Modal>
     </div>
   )
  }
}
