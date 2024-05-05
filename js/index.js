// 셀렉터
const $ = str => document.querySelector(str)
const $all = str => document.querySelectorAll(str)

/* -------------------------- 정의 -------------------------- */
let regStr = ""

const trans = [
  {
    view: '.시작()',
    classify: 'reg',
    kor: '.시작(',
    eng: '.startOfLine(',
    add: '.시작()',
    des: `<h5>행의 시작부분부터 나타나는 경우에만 일치여부를 결정합니다.</h5>`
       + `ex) .시작().일치("apple")
              apple juice => true
              pineapple => false`,
  },
  {
    view: '.끝()',
    classify: 'reg',
    kor: '.끝(',
    eng: '.endOfLine(',
    add: '.끝()',
    des: `<h5>행의 끝부분까지 일치하는 경우에만 일치여부를 결정합니다.</h5>`
       + `ex) .일치("apple").끝()
              pineapple => true
              apple juice => false`,
  },
  {
    view: '.일치()',
    classify: 'reg',
    kor: '.일치(',
    eng: '.then(',
    add: '.일치("")',
    des: `<h5>해당구문의 포함여부를 확인합니다.</h5>`
       + `ex) .일치("test")
              this is test => true`,
  },
  {
    view: '.가능()',
    classify: 'reg',
    kor: '.가능(',
    eng: '.maybe(',
    add: '.가능("")',
    des: `<h5>해당구문이 포함될수도 안될수도 있습니다.</h5>`
       + `ex) .일치("http").가능("s").일치("://")
              http:// => true
              https:// => true`,
  },
  {
    view: '.또는()',
    classify: 'reg',
    kor: '.또는(',
    eng: '.or(',
    add: '.또는("")',
    des: `<h5>이전의 표현식이나 내부의 표현식 둘 중 하나만 일치해도 true를 반환합니다.</h5>`
       + `ex) .일치("test").또는("next")
              test => true
              next => true

          <h5>만약 내부에 표현식을 적지 않으면 다음 표현식이 대상이 됩니다.</h5>`
       + `ex) .일치("test").또는().일치("next")
              test => true
              next => true`,
  },
  {
    view: '.모든()',
    classify: 'reg',
    kor: '.모든(',
    eng: '.anything(',
    add: '.모든()',
    des: `<h5>모든 문자를 true로 반환합니다. (0글자 포함)</h5>`
       + `ex) .일치("There are").모든().일치("pencils")
              There are 3 pencils => true
              There arepencils => true`,
  },
  {
    view: '.빼고모든()',
    classify: 'reg',
    kor: '.빼고모든(',
    eng: '.anythingBut(',
    add: '.빼고모든("")',
    des: `<h5>내부의 문자를 제외한 모든 문자를 true로 반환합니다. (0글자 포함)</h5>`
       + `ex) .일치("There are").빼고모든("345").일치("pencils")
              There arepencils => true
              There are 2 pencils => true
              There are 4 pencils => false
              There are 246 pencils => false`,
  },
  {
    view: '.존재()',
    classify: 'reg',
    kor: '.존재(',
    eng: '.something(',
    add: '.존재()',
    des: `<h5>모든 문자를 true로 반환합니다. (0글자 미포함)</h5>`
       + `ex) .일치("There are").존재().일치("pencils")
              There are 3 pencils => true
              There are pencils => true
              There arepencils => false`,
  },
  {
    view: '.빼고존재()',
    classify: 'reg',
    kor: '.빼고존재(',
    eng: '.somethingBut(',
    add: '.빼고존재("")',
    des: `<h5>내부의 문자를 제외한 모든 문자를 true로 반환합니다. (0글자 미포함)</h5>`
       + `ex) .일치("There are").빼고존재("345").일치("pencils")
              There arepencils => false
              There are 2 pencils => true
              There are 4 pencils => false
              There are 246 pencils => false`,
  },
  {
    view: '.한글자만()',
    classify: 'reg',
    kor: '.한글자만(',
    eng: '.anyOf(',
    add: '.한글자만("")',
    des: `<h5>내부의 문자 중 한글자만 정확히 일치시 true로 반환합니다.</h5>`
       + `ex) .일치("There are").한글자만("345").일치("pencils")
              There arepencils => false
              There are4pencils => true
              There are 4 pencils => false
              There are345pencils => false`,
  },
  {
    view: '.제외()',
    classify: 'reg',
    kor: '.제외(',
    eng: '.not(',
    add: '.제외("")',
    des: `<h5>내부의 문자와 일치시 false를 반환합니다.</h5>`
       + `ex) .일치("There are ").제외("34")
              There are 3 pencils => true
              There are 134 pencils => true
              There are 345 pencils => false`,
  },
  {
    view: '.범위()',
    classify: 'reg',
    kor: '.범위(',
    eng: '.range(',
    add: '.범위("","")',
    des: `<h5>범위 내의 문자와 일치여부를 판단합니다. 짝수개의 변수를 범위로 받고, 짝이 없는 변수는 버려집니다.</h5>`
       + `ex) .일치("There are ").범위("3","6", "a","f", "가","힣").일치(" pencils")
              There are 5 pencils => true
              There are 8 pencils => false
              There are c pencils => true
              There are g pencils => false
              There are 열 pencils => true`,
  },
  {
    view: '.숫자()',
    classify: 'reg',
    kor: '.숫자(',
    eng: '.digit(',
    add: '.숫자()',
    des: `<h5>숫자를 판단합니다.</h5>`,
  },
  {
    view: '.영어()',
    classify: 'reg',
    kor: '.영어(',
    eng: '.range("a","z","A","Z","0","9"',
    add: '.영어()',
    des: `<h5>a–z, A–Z, 0–9를 판단합니다.</h5>`,
  },
  {
    view: '.영어언더바()',
    classify: 'reg',
    kor: '.영어언더바(',
    eng: '.word(',
    add: '.영어언더바()',
    des: `<h5>a–z, A–Z, 0–9, _(언더바)를 판단합니다.</h5>`,
  },
  {
    view: '.영어만()',
    classify: 'reg',
    kor: '.영어만(',
    eng: '.range("a","z","A","Z"',
    add: '.영어만()',
    des: `<h5>a–z, A–Z를 판단합니다.</h5>`,
  },
  {
    view: '.대문자만()',
    classify: 'reg',
    kor: '.대문자만(',
    eng: '.range("A","Z"',
    add: '.대문자만()',
    des: `<h5>A–Z를 판단합니다.</h5>`,
  },
  {
    view: '.소문자만()',
    classify: 'reg',
    kor: '.소문자만(',
    eng: '.range("a","z"',
    add: '.소문자만()',
    des: `<h5>a–z를 판단합니다.</h5>`,
  },
  {
    view: '.한영()',
    classify: 'reg',
    kor: '.한영(',
    eng: '.range("가","힣","a","z","A","Z","0","9"',
    add: '.한영()',
    des: `<h5>가-힣, a–z, A–Z, 0–9를 판단합니다.</h5>`,
  },
  {
    view: '.한영언더바()',
    classify: 'reg',
    kor: '.한영언더바(',
    eng: '.range("가","힣","a","z","A","Z","0","9","_","_"',
    add: '.한영언더바()',
    des: `<h5>가-힣, a–z, A–Z, 0–9, _(언더바)를 판단합니다.</h5>`,
  },
  {
    view: '.한글숫자()',
    classify: 'reg',
    kor: '.한글숫자(',
    eng: '.range("가","힣","0","9"',
    add: '.한글숫자()',
    des: `<h5>한글, 숫자를 판단합니다.</h5>`,
  },
  {
    view: '.한글만()',
    classify: 'reg',
    kor: '.한글만(',
    eng: '.range("가","힣"',
    add: '.한글만()',
    des: `<h5>한글을 판단합니다.</h5>`,
  },
  {
    view: '.한글자모()',
    classify: 'reg',
    kor: '.한글자모(',
    eng: '.range("ㄱ","ㅎ","ㅏ","ㅣ","가","힣"',
    add: '.한글자모()',
    des: `<h5>한글을 판단합니다. (자음, 모음 포함)</h5>`,
  },
  {
    view: '.이메일()',
    classify: 'reg',
    kor: '.이메일(',
    eng: `.add("[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}"`,
    add: '.이메일()',
    des: `<h5>이메일을 판단합니다.</h5>`,
  },

  {
    view: '.엔터()',
    classify: 'reg',
    kor: '.엔터(',
    eng: '.br(',
    add: '.엔터()',
    des: `<h5>줄바꿈을 판단합니다.</h5>`,
  },
  {
    view: '.탭()',
    classify: 'reg',
    kor: '.탭(',
    eng: '.tab(',
    add: '.탭()',
    des: `<h5>탭을 판단합니다.</h5>`,
  },
  {
    view: '.공백()',
    classify: 'reg',
    kor: '.공백(',
    eng: '.whitespace(',
    add: '.공백()',
    des: `<h5>공백을 판단합니다.</h5>`
       + `(스페이스, 탭 \\t, 커서이동 \\r, 개행 \\n, 수직탭 \\v, 폼피드 \\f)`,
  },
  {
    view: '.수동()',
    classify: 'reg',
    kor: '.수동(',
    eng: '.add(',
    add: '.수동("")',
    des: `<h5>직접 원하는 표현식을 추가합니다.</h5>`
       + `ex) .수동("(foo)?(?:bar)*")`,
  },

  {
    view: '.반복()',
    classify: 'func',
    kor: '.반복(',
    eng: '.multiple(',
    add: '.반복()',
    des: `<h5>직전의 내용을 0회이상 반복합니다.</h5>`
       + `ex) .일치("There are ").일치("many ").반복().일치("pencils")
              There are many many pencils => true
              There are pencils => true

          <h5>내부에 직접 반복내용을 적을수도 있습니다.</h5>`
       + `ex) .일치("There are ").반복("many ").일치("pencils")
              There are many many pencils => true
              There are pencils => true

          <h5>반복내용과 1개의 숫자를 적으면 최소 반복횟수가 됩니다.</h5>`
       + `ex) .일치("There are ").반복("many ", 2).일치("pencils")
              There are many many pencils => true
              There are many pencils => false
              There are pencils => false

          <h5>반복내용과 2개의 숫자를 적으면 최소, 최대 반복횟수가 됩니다.</h5>`
       + `ex) .일치("There are ").부재반복("many ", 2, 3).일치("pencils")
              There are many many pencils => true
              There are many pencils => false
              There are pencils => false`,
  },
  {
    view: '.존재반복()',
    classify: 'func',
    kor: '.존재반복(',
    eng: '.oneOrMore(',
    add: '.존재반복()',
    des: `<h5>직전의 내용을 1회이상 반복합니다.</h5>`
       + `ex) .일치("There are ").일치("many ").존재반복().일치("pencils")
              There are many many pencils => true
              There are pencils => false`,
  },
  {
    view: '.횟수반복()',
    classify: 'func',
    kor: '.횟수반복(',
    eng: '.repeatPrevious(',
    add: '.횟수반복()',
    des: `<h5>직전의 내용을 내부에 적은 특정횟수만큼 반복합니다.</h5>`
       + `ex) .일치("There are ").일치("many ").횟수반복(3).일치("pencils")
              There are many many many pencils => true
              There are many pencils => false

          <h5>두개의 횟수를 적을 경우 최소, 최대 반복횟수가 됩니다.</h5>`
       + `ex) .일치("There are ").일치("many ").횟수반복(2,3).일치("pencils")
              There are many many many pencils => true
              There are many many pencils => true
              There are many pencils => false`,
  },
  {
    view: '.묶음시작()',
    classify: 'func',
    kor: '.묶음시작(',
    eng: '.beginCapture(',
    add: '.묶음시작()',
    des: `<h5>작업할 내용을 묶어줍니다. 반드시 묶음끝()과 같이 사용해야합니다.</h5>`
       + `ex)
          .묶음시작()
          .숫자().존재반복().일치(".")
          .묶음끝().횟수반복(3)
          2020.02.02. => true`,
  },
  {
    view: '.묶음끝()',
    classify: 'func',
    kor: '.묶음끝(',
    eng: '.endCapture(',
    add: '.묶음끝()',
    des: `<h5>작업할 내용을 묶어줍니다. 반드시 묶음시작()과 같이 사용해야합니다.</h5>`
       + `ex) 
          .묶음시작()
          .숫자().존재반복().일치(".")
          .묶음끝().횟수반복(3)
          2020.02.02. => true`,
  },

  {
    view: '.플래그추가()',
    classify: 'flag',
    kor: '.플래그추가(',
    eng: '.addModifier(',
    add: '.플래그추가("")',
    des: `<h5>플래그를 직접 추가합니다.</h5>`
       + `ex) .플래그추가("i")
              /gm -> /gim`,
  },
  {
    view: '.플래그제거()',
    classify: 'flag',
    kor: '.플래그제거(',
    eng: '.removeModifier(',
    add: '.플래그제거("")',
    des: `<h5>플래그를 직접 제거합니다.</h5>`
       + `ex) .플래그제거("m")
              /gm -> /g`,
  },
  {
    view: '.대소문자()',
    classify: 'flag',
    kor: '.대소문자(',
    eng: '.withAnyCase(',
    add: '.대소문자()',
    des: `<h5>대소문자를 구분하지 않습니다. .플래그추가("i")와 동일합니다.</h5>`
       + `ex) .일치("#").범위("a","f", "0","9").대소문자()
              #93afee => true
              #93AFEE => true`,
  },
  {
    view: '.한번만()',
    classify: 'flag',
    kor: '.한번만(',
    eng: '.stopAtFirst(',
    add: '.한번만()',
    des: `<h5>일치하는 표현을 최초 한번만 찾습니다. .플래그제거("g")와 동일합니다.</h5>`
      + `ex) .영어만().한번만()
              #93afee => a`,
  }

]

const color = {
  reg: "warning",
  func: "danger",
  flag: "success",
}

/* -------------------------- 기능 -------------------------- */
// 클릭으로 조건 추가
const addToCondition = (str) => {
  insertMiddle($("#condition"), str)
  conditionChange()
}

// textarea 중간에 삽입 및 커서 처리
const insertMiddle = (selector, insertStr) => {
  const cursor = selector.selectionStart
  const tmpStr = selector.value
  selector.value = tmpStr.substring(0, cursor) + insertStr + tmpStr.substring(cursor, tmpStr.length)
  selector.focus()
  selector.setSelectionRange(cursor+insertStr.length, cursor+insertStr.length)
}

// 조건 변경
const conditionChange = () => {
  $("#condition").style.height = 0
  $("#condition").style.height = 30 + $("#condition").scrollHeight + "px"

  let condition = $("#condition").value.trim()

  trans.forEach(li => {
    condition = condition.replaceAll(li.kor, li.eng)
  })

  regStr = "return VerEx()"+condition
  try {
    const result = new Function(regStr)()
    if(typeof result == "undefined" || typeof result == "function") throw "error"
    $("#output").innerText = result
  } catch(e) {
    $("#output").innerText = "올바른 표현식이 아닙니다."
  }
  changeAnswer()
}

// 테스트 변경
const testChange = () => {
  $("#test").style.height = 0
  $("#test").style.height = 30 + $("#test").scrollHeight + "px"
  $("#answer").style.height = 0
  $("#answer").style.height = $("#test").style.height

  changeAnswer()
}

// 결과 반영
const changeAnswer = () => {
  const conditionFlag = $("#output").innerText.split("/")
  const hasGFlag = conditionFlag[conditionFlag.length-1].includes("g")

  const testStr = `${regStr}.stopAtFirst(false).toRegExp()`
  try {
    const condition = new Function(testStr)()
    const testList = $("#test").value.replaceAll("'", "\\'").split("\n")

    let result = ""

    // 각 라인별 테스트
    testList.forEach((test)=>{
      const matchList = test.match(condition)
      let resultLine = ""

      // 일치부분 색입히기
      if(matchList) {
        const splitList = test.split(condition)
        splitList.forEach((split, i) => {
          if(hasGFlag || (!hasGFlag && i===0)) {
            resultLine += `${split}<span class="text-success">${matchList[i] || ""}</span>`
          } else {
            resultLine += split + (matchList[i] || "")
          }
        })
      } else {
        resultLine = test
      }

      result += `<div class="text-danger">${resultLine}</div>`
    })
    $("#answer").innerHTML = result
  } catch(e) {
    $("#answer").innerHTML = "오류"
  }
}

// 클립보드 복사
const copyText = (e) => {
  $("#clipboard").value = e.innerText
  $("#clipboard").classList.remove("d-none")
  $("#clipboard").select()
  document.execCommand("copy")
  $("#clipboard").classList.add("d-none")
  alert("클립보드에 복사되었습니다.")
}

// 다크모드 변경
const modeChange = () => {
  if($("#mode").innerText === "Dark") {
    $("#mode").innerText = "Light"
    $all(".lightMode").forEach(li => {
      li.classList.add("darkMode")
      li.classList.remove("lightMode")
    })
    window.localStorage.setItem("EveryRegExpMode", "darkMode")
  } else {
    $("#mode").innerText = "Dark"
    $all(".darkMode").forEach(li => {
      li.classList.add("lightMode")
      li.classList.remove("darkMode")
    })
    window.localStorage.setItem("EveryRegExpMode", "lightMode")
  }
}

// 링크열기
const openLink = (link) => {
  window.open(link, "_blank")
}
/* -------------------------- 초기 셋팅 및 실행 -------------------------- */
window.onload = () =>{
  // 다크모드
  if("darkMode" === window.localStorage.getItem("EveryRegExpMode")) modeChange()

  // 탭키 따로 처리
  $all("textarea").forEach((e)=>{
    e.addEventListener("keydown", (event) => {
      if(event.keyCode == 9) {
        event.preventDefault()
        insertMiddle(e, "\t")
        changeAnswer()
      }
    })
  })
  makeAddList()
}

// 버튼 및 설명 추가
const makeAddList = () => {
  let btnStr = ""
  let tipStr = `<table>
											  <colgroup>
													<col style="min-width: 120px;" />
													<col />
												</colgroup>`
  let exClass = ""

  trans.forEach(li => {
    if(exClass !== li.classify) {
      btnStr += "<div></div>"
      exClass = li.classify
    }

    btnStr += `<span class="me-2 mb-2 btn btn-sm btn-${ color[li.classify] }" onclick={addToCondition('${ li.add }')}>${ li.view }</span>`
    tipStr += `<tr>
										<td class="align-top text-end pe-2 pt-1">
											<div class="btn btn-sm btn-${ color[li.classify] }" onclick={addToCondition('${ li.add }')}>${ li.view }</div>
											<div class="py-1"></div>
										</td>
										<td class="align-middle">${ li.des.replaceAll("\n", "<br>") }<div class="py-1"></div></td>
									</tr>`
  })
  tipStr += "</table>"

  $("#clickList").innerHTML = btnStr
  $("#tipList").innerHTML = tipStr
}