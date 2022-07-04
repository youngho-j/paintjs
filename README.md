# paintjs

Painting Board made with VanillaJS

## 목차
  - [커서 이미지 변경시 발생한 문제 정리](#커서-이미지-변경시-발생한-문제-정리)  

---

### 커서 이미지 변경시 발생한 문제 정리
<details>
    <summary>자세히</summary>

#### 문제 
  - 엘리먼트의 스타일에 접근이 불가한 현상 발생 : undefined

#### CSSOM?
  - 웹 사이트를 브라우저 상에 표현시 서버로 부터 받은 정보를 브라우저가 렌더링 엔진을 통해 두 가지 요소 파싱(HTML, CSS
  - `DOM(Document Object Model)` : HTML을 피싱하여 자료를 구조화한 것
  - `CSSOM(CSS Object Model)` : CSS 내용을 파싱하여 자료를 구조화한 것
    - JavaScript에서 CSS를 조작할 수 있는 API 집합
    - 사용자가 CSS 스타일을 동적으로 읽고 수정할 수 있는 방법
    - CSSOM-related 규격에 의해 확장되는 객체 : Document, Window, Element, HTMLElement 등

#### element.style.propertyName을 통한 제어
  - 쉽게 CSS 속성과 값을 선언을 할 수 있음
  - 단, 오직 인라인으로 정의된 엘리먼트 스타일에만 적용
  - 엘리멘트 속성?  
    - 태그 내의 인-라인으로 정의한 것
    - 크롬 개발자 도구 Elements를 통해 Style 값 확인 가능
  - style 키워드는 해당 DOM 노드를 직접 가져오기 떄문에 브라우저 상에는 적용되어 그려지지만 노드에는 스타일 값이 없음

####  window.getComputedStyle() 사용
  - `인자로 전달받은 엘리먼트에 최종적으로 적용된 모든 CSS 속성 값을 담은 객체를 반환` 
  - 값을 모두 가져올 수 있지만, `읽기 전용`으로 객체가 반환됨
  - 따라서, 스타일 검사용으로 사용할 수 있음..

#### 해결
  - Element.style.setProperty를 통해 새로운 스타일 설정하도록 함

#### Refference
  - [CSS 객체 모델](https://developer.mozilla.org/ko/docs/Web/API/CSS_Object_Model)  
  - [Element.style 속성과 getComputedStyle()메서드 차이](https://helloinyong.tistory.com/284)  
</details>