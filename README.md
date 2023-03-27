# MSA 통합 프로젝트 - 물류

![image](https://user-images.githubusercontent.com/106158682/223021208-804d6650-5800-4583-98cc-08facb8f658c.png)

---
### 소개

앞서 한 프로젝트에선 인사, 회계, 물류 ERP를 각각 Monolithic Architecture 방식으로 각각 한 프로젝트로 직행했으나, 마지막 프로젝트로 3개의 서비스를 하나로 통합하여 진행하기로 하였는데 MicroService Architecture 방식을 채택하기로 했습니다. 

MSA를 채택하게 된 이유는 각각의 서비스를 팀을 나눠 진행중이었기 때문에 서비스를 나누는 것이 장애가 전체 서비스로 확장되는 것도 피하고 배포도 빠르게 할 수 있으니 이 방식이 효율적이라고 생각했고, 무엇보다 앞서 2번의 프로젝트를 Monolithic Archtecture로 진행했기 때문에 마지막엔 MSA 학습을 위해서 채택하였습니다.

이 리포지터리는 MSA로 나누어진 서비스의 전체 프론트 부분에 해당합니다.

---
### 프로젝트 실행

화면은 리액트 백은 스프링 부트로 구성되어 있습니다. 물류 소스를 받아 같이 실행해야 사용 가능합니다.  
추가적으로 덤프파일도 받아 오라클 서버에 설치해 줘야 모든 기능이 사용 가능 합니다.  
**스프링 부트 물류 Repository** : https://github.com/o-rchid/REACT73_LogisticBack  
**실행 주소** : localhost:3000

---

### 프로젝트 진행

팀원들이 스프링 부트로 백을 구성하는 것에 대해서는 모두 기반 지식이 있었기 때문에 물류 업무 프로세스와 리액트에 대해 공부하면서 프로젝트를 진행하였습니다. MUI에서 제공하는 BerryTemplate를 구매하여 사용하였는데 추가적으로 Redux, Saga, AgGrid, Axios 등을 적용하여 사용하였습니다. 진행기간은 약 2-3개월에 해당하고 4개의 유스케이스를 뽑아 분업을 하였습니다. 


팀원1 | 팀원2 | 팀원3 | 본인 |
--- | --- | --- | --- | 
물류정보관리 | 영업서비스관리 | 구매서비스관리 | 생산계획서비스관리 |

---

### 기능 소개  

- **MPS**  

주일정계획을 의미하는 MPS는 고객의 주문에 의한 수요, 일반적으로 예측되는 수요, 계절적인 수요 등의 요구에 맞추어 공급할 목적으로 목적제품을 생산하기 위해 작성된 총괄적인 생산 일정계획을 말합니다.  
주일정계획이 등록 가능한 수주를 조회하여 계획일자와 출하예정일을 입력하여야 MPS 등록을 할 수 있도록 되어 있습니다.  

![녹화_2023_03_06_14_37_34_964](https://user-images.githubusercontent.com/106158682/223030341-11c45f4d-fe9d-4b3c-92d8-904269b576d4.gif)
  

- **MRP**  

자재소요계획을 의미하는 MRP는 부품이나 자재의 소요와 조달에 대한 관리를 체계적으로 함으로써 전공정의 생산관리에 있어서의 최대의 효율성을 기하기 위한 총괄적인 재고관리를 의미합니다.  
MPS는 어떤 원자재가 언제 얼마만큼 필요한가를 구하는 게 목표입니다. MRP 계산은 주일정계획(MPS)으로부터 최종품목소요량을 구하고 그 품목과 부품의 자재명세서와 재고상황파일의 정보를 얻어 부품자재량이 계산되고 자재가 필요할 때 도착할 수 있도록 발주기일이 설정됩니다.  
앞서 말한 일련의 과정은 MPS조회 - MRP모의전개 - 전개결과 MRP 등록을 통해 이루어 집니다.

![녹화_2023_03_06_14_38_59_455](https://user-images.githubusercontent.com/106158682/223029186-9db42b26-ce3c-4811-a601-30fee4ee5d64.gif)

---

### 기술 및 개발환경  
 
- Spring boot 
- Oracle 11g
- MyBatis
- React  
- Redux  
- Saga  
- Ag-Grid  
- MUI
- Axios  
- Jira
- BitBucket (협업은 빗버킷에서 진행하였으나 Github에 개인 기록용으로 올림)  
