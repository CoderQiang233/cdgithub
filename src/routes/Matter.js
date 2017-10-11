import React from 'react';

import { connect } from 'dva';

import styles from './Matter.less';

import TLeave from '../components/matters/TLeave'

import SLostCard from '../components/matters/SLostCard'
// 教职工在职证明办理  
import TProofEmployment from '../components/matters/TProofEmployment'
// 教职工工作证办理  
import TWorkPermit from '../components/matters/TWorkPermit'
// 教职工报到手续办理  
import TRegisterProcedures from '../components/matters/TRegisterProcedures'
// 教职工退休手续办理 
import TRetirementProcedures from '../components/matters/TRetirementProcedures'
// 教职工收入证明（非出国）办理 
import TProofIncome from '../components/matters/TProofIncome'
// 教职工进修（高访学者）费用报销手续办理
import TTrainingReimbursement from '../components/matters/TTrainingReimbursement'
// 教职工婚育证明
import TMarriage from '../components/matters/TMarriage'
// 教职工子女落户介绍信办理
import TSettleInformation from '../components/matters/TSettleInformation'
// 学生户口复印
import SAccountCopy from '../components/matters/SAccountCopy'
// 新生落户手续办理
import SSettleProcedures from '../components/matters/SSettleProcedures'
// 毕业生户口迁移  
import SGraduationAccount from '../components/matters/SGraduationAccount'
// 毕业生身份证换证、补办  
import SIDCardReplacement from '../components/matters/SIDCardReplacement'
// 研究生已注册机动车辆门禁系统信息变更手续办理  
import SCarInformationChange from '../components/matters/SCarInformationChange'
// 研究生新注册机动车辆门禁系统手续办理 
import SCarAccessProcedure from '../components/matters/SCarAccessProcedure'
// 退学学生户口迁移  
import SDropoutAccount from '../components/matters/SDropoutAccount'
// 教职工已注册机动车辆门禁系统信息变更手续办理  
import TCarInformationChange from '../components/matters/TCarInformationChange'
// 教职工新注册机动车辆门禁系统手续办理 
import TCarAccessProcedure from '../components/matters/TCarAccessProcedure'
// 教职工配偶和子女新注册机动车辆门禁系统手续办理 
import TpoznCarAccessProcedure from '../components/matters/TpoznCarAccessProcedure'
// 教职工（子女）户口借用  
import TCAccountBorrow from '../components/matters/TCAccountBorrow'
// 教职工（子女）户口复印  
import TCAccountCopy from '../components/matters/TCAccountCopy'
// 教职工（子女）身份证换证、丢失补办  
import TCIDCardReplaceRecruitment from '../components/matters/TCIDCardReplaceRecruitment'
// 教职工缴纳水电费  
import TPayHydropower from '../components/matters/TPayHydropower'
// 创业政策咨询 
import SBusinessPolicyAdvisory from '../components/matters/SBusinessPolicyAdvisory'
// 毕业生就业协议书遗失补办手续办理
import SEmploymentAgreement from '../components/matters/SEmploymentAgreement'
// 毕业生调整改派手续办理  
import SAdjustChange from '../components/matters/SAdjustChange'
// 毕业生违约申领协议书手续办理 
import SBreachAgreement from '../components/matters/SBreachAgreement'
// 补办就业报到证或证明书手续办理 
import SEmploymentReportCard from '../components/matters/SEmploymentReportCard'
// 就业政策咨询  
import SEmploymentPolicyAdvice from '../components/matters/SEmploymentPolicyAdvice'
// 在校住宿学生开具住宿证明 
import SAccommodationStudentsProve from '../components/matters/SAccommodationStudentsProve'
// 退学学生退宿  
import SDropoutDorm from '../components/matters/SDropoutDorm'
// 勤工助学工作咨询  
import SWorkStudy from '../components/matters/SWorkStudy'
// 奖贷困补政策咨询 
import SLoanSubsidy from '../components/matters/SLoanSubsidy'
// 学生管理工作咨询
import SManagementWork from '../components/matters/SManagementWork'
// 应征入伍服义务兵役学生学费补偿申请  
import SSoldierSubsidy from '../components/matters/SSoldierSubsidy'
// 心理健康工作咨询  
import SMentalHealthWork from '../components/matters/SMentalHealthWork'
// 本科生在读证明办理
import SProofReading from '../components/matters/SProofReading'
// 师生各类材料用印
import AllMaterials from '../components/matters/AllMaterials'
// 教职工医疗保险办理
import TMedicalInsurance from '../components/matters/TMedicalInsurance'
// 开具团组织介绍信和相关证明
import TOrganizationLetter from '../components/matters/TOrganizationLetter'
// 研究生在读证明办理
import SPostgraduateProofReading from '../components/matters/SPostgraduateProofReading'
// 学术成果审定评级
import TAcademicResults from '../components/matters/TAcademicResults'
// 科研项目申报、中检和结项材料审核及合同审批
import TResearchProjectProcess from '../components/matters/TResearchProjectProcess'
// 学生党员组织关系转入手续办理
import SPartyRelationsIn from '../components/matters/SPartyRelationsIn'
// 教职工党员组织关系转入手续办理
import TPartyRelationsIn from '../components/matters/TPartyRelationsIn'
// 学生信息门户用户密码重置
import SUserResetPassword from '../components/matters/SUserResetPassword'
// 学生校园网开户
import SCampusNetAccount from '../components/matters/SCampusNetAccount'
// 学生校园网用户注销
import SCampusNetUserLogout from '../components/matters/SCampusNetUserLogout'
// 学生校园网用户退费
import SCampusNetUsersRefund from '../components/matters/SCampusNetUsersRefund'
// 学生校园网络故障报修
import SCampusNetFaultRepair from '../components/matters/SCampusNetFaultRepair'
// 教职工信息门户用户密码重置
import TUserResetPassword from '../components/matters/TUserResetPassword'
// 教职工校园网开户
import TCampusNetAccount from '../components/matters/TCampusNetAccount'
// 教职工校园网用户注销
import TCampusNetUserLogout from '../components/matters/TCampusNetUserLogout'
// 教职工校园网络故障报修
import TCampusNetFaultRepair from '../components/matters/TCampusNetFaultRepair'
// 教职工住房证明办理
import THouseProve from '../components/matters/THouseProve'
// 教职工科研项目资金购置固定资产入库手续办理
import TResearchProjects from '../components/matters/TResearchProjects'
//教职工进修（高访学者）审批手续办理  
import TFurtherApproval from '../components/matters/TFurtherApproval'
class Matter extends React.Component{
  constructor(props){
    
            super(props)
    
            this.state={}      
                                            
  }

  
  
  componentWillMount(){
    
  }

  render(){
 
    const matter=this.props.params.matter;

    return(
    <div className={styles.normal}>
      <div className={styles.banner}>
          <img src={require('../assets/images/banner.jpg')} />
      </div>
      <div>
        {
          matter=='TLeave'&&
          <TLeave history={this.props.history}/>
        }
        {
          matter=='SLostCard'&&
          <SLostCard history={this.props.history}/>
        }
        {
          matter=='TProofEmployment'&&
          <TProofEmployment history={this.props.history}/>
        }
        {
          matter=='TWorkPermit'&&
          <TWorkPermit history={this.props.history}/>
        }
        {
          matter=='TRegisterProcedures'&&
          <TRegisterProcedures history={this.props.history}/>
        }
        {
          matter=='TRetirementProcedures'&&
          <TRetirementProcedures history={this.props.history}/>
        }
        {
          matter=='TProofIncome'&&
          <TProofIncome history={this.props.history}/>
        }
        {
          matter=='TTrainingReimbursement'&&
          <TTrainingReimbursement history={this.props.history}/>
        }
        {
          matter=='TMarriage'&&
          <TMarriage history={this.props.history}/>
        }
        {
          matter=='TSettleInformation'&&
          <TSettleInformation history={this.props.history}/>
        }
        {
          matter=='SAccountCopy'&&
          <SAccountCopy history={this.props.history}/>
        }
        {
          matter=='SSettleProcedures'&&
          <SSettleProcedures history={this.props.history}/>
        }
        {
          matter=='SGraduationAccount'&&
          <SGraduationAccount history={this.props.history}/>
        }
        {
          matter=='SIDCardReplacement'&&
          <SIDCardReplacement history={this.props.history}/>
        }
        {
          matter=='SCarInformationChange'&&
          <SCarInformationChange history={this.props.history}/>
        }
        {
          matter=='SCarAccessProcedure'&&
          <SCarAccessProcedure history={this.props.history}/>
        }
        {
          matter=='SDropoutAccount'&&
          <SDropoutAccount history={this.props.history}/>
        }
        {
          matter=='TCarInformationChange'&&
          <TCarInformationChange history={this.props.history}/>
        }
        {
          matter=='TCarAccessProcedure'&&
          <TCarAccessProcedure history={this.props.history}/>
        }
        {
          matter=='TpoznCarAccessProcedure'&&
          <TpoznCarAccessProcedure history={this.props.history}/>
        }
        {
          matter=='TCAccountBorrow'&&
          <TCAccountBorrow history={this.props.history}/>
        }
        {
          matter=='TCAccountCopy'&&
          <TCAccountCopy history={this.props.history}/>
        }
        {
          matter=='TCIDCardReplaceRecruitment'&&
          <TCIDCardReplaceRecruitment history={this.props.history}/>
        }
        {
          matter=='TPayHydropower'&&
          <TPayHydropower history={this.props.history}/>
        }
        {
          matter=='SBusinessPolicyAdvisory'&&
          <SBusinessPolicyAdvisory history={this.props.history}/>
        }
        {
          matter=='SEmploymentAgreement'&&
          <SEmploymentAgreement history={this.props.history}/>
        }
        {
          matter=='SAdjustChange'&&
          <SAdjustChange history={this.props.history}/>
        }
        {
          matter=='SBreachAgreement'&&
          <SBreachAgreement history={this.props.history}/>
        }
        {
          matter=='SEmploymentReportCard'&&
          <SEmploymentReportCard history={this.props.history}/>
        }
        {
          matter=='SEmploymentPolicyAdvice'&&
          <SEmploymentPolicyAdvice history={this.props.history}/>
        }
        {
          matter=='SAccommodationStudentsProve'&&
          <SAccommodationStudentsProve history={this.props.history}/>
        }
        {
          matter=='SDropoutDorm'&&
          <SDropoutDorm history={this.props.history}/>
        }
        {
          matter=='SWorkStudy'&&
          <SWorkStudy history={this.props.history}/>
        }
        {
          matter=='SLoanSubsidy'&&
          <SLoanSubsidy history={this.props.history}/>
        }
        {
          matter=='SManagementWork'&&
          <SManagementWork history={this.props.history}/>
        }
        {
          matter=='SSoldierSubsidy'&&
          <SSoldierSubsidy history={this.props.history}/>
        }
        {
          matter=='SMentalHealthWork'&&
          <SMentalHealthWork history={this.props.history}/>
        }
        {
          matter=='SProofReading'&&
          <SProofReading history={this.props.history}/>
        }
        {
          matter=='AllMaterials'&&
          <AllMaterials history={this.props.history}/>
        }
        {
          matter=='TMedicalInsurance'&&
          <TMedicalInsurance history={this.props.history}/>
        }
        {
          matter=='TOrganizationLetter'&&
          <TOrganizationLetter history={this.props.history}/>
        }
        {
          matter=='SPostgraduateProofReading'&&
          <SPostgraduateProofReading history={this.props.history}/>
        }
        {
          matter=='TAcademicResults'&&
          <TAcademicResults history={this.props.history}/>
        }
        {
          matter=='TResearchProjectProcess'&&
          <TResearchProjectProcess history={this.props.history}/>
        }
        {
          matter=='SPartyRelationsIn'&&
          <SPartyRelationsIn history={this.props.history}/>
        }
        {
          matter=='TPartyRelationsIn'&&
          <TPartyRelationsIn history={this.props.history}/>
        }
        {
          matter=='SUserResetPassword'&&
          <SUserResetPassword history={this.props.history}/>
        }
        {
          matter=='SCampusNetAccount'&&
          <SCampusNetAccount history={this.props.history}/>
        }
        {
          matter=='SCampusNetUserLogout'&&
          <SCampusNetUserLogout history={this.props.history}/>
        }
        {
          matter=='SCampusNetUsersRefund'&&
          <SCampusNetUsersRefund history={this.props.history}/>
        }
        {
          matter=='SCampusNetFaultRepair'&&
          <SCampusNetFaultRepair history={this.props.history}/>
        }
        {
          matter=='TUserResetPassword'&&
          <TUserResetPassword history={this.props.history}/>
        }
        {
          matter=='TCampusNetAccount'&&
          <TCampusNetAccount history={this.props.history}/>
        }
        {
          matter=='TCampusNetUserLogout'&&
          <TCampusNetUserLogout history={this.props.history}/>
        }
        {
          matter=='TCampusNetFaultRepair'&&
          <TCampusNetFaultRepair history={this.props.history}/>
        }
        {
          matter=='THouseProve'&&
          <THouseProve history={this.props.history}/>
        }
        {
          matter=='TResearchProjects'&&
          <TResearchProjects history={this.props.history}/>
        }
        {
          matter=='TFurtherApproval'&&
          <TFurtherApproval history={this.props.history}/>
        }
      </div>

    </div>
    )
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Matter);
