# Banksalad Git Usage Guide

뱅크샐러드 엔지니어링 팀에서 지향하는 Git 사용법 가이드입니다.


## 커밋 메시지 Style Guide

좋은 Git 커밋 메시지(이하 커밋 메시지)를 작성하는 일은 그리 쉬운 일이 아닙니다. 이에 저희가 생각하는 좋은 커밋 메시지의 형태에 대한 생각을 공유합니다.
### Structure

커밋 메시지는 다음의 형태로 작성해주세요.

```
[JIRA-123] Short (50 chars or less) summary of changes

Additional explanation if necessary.

#issue or https://your-reference.com/link
```

### DO
- 가장 처음엔 [Jira](https://rainist.atlassian.net/jira/) Ticket 번호를 추가해주세요.
    + 커밋 메시지에는 모두 담을 수 없는 추가적인 내용을 전달 하는데 도움이 됩니다.
- 요약은 반드시 영어로 작성해주세요.
    + 이는 오픈 소스 코드 저장소를 참고하거나 저장소에 기여할 때의 장벽을 낮춰주는 훈련이 됩니다.
- 언제나 요약은 명령문 형태로 작성해주세요. 주어를 따로 적지 않고 동사로 문장을 시작하며 늘 동사 원형을 사용합니다.
    + `I added README` (:x:)
    + `I add README` (:x:)
    + `Added README` (:x:)
    + `Adds README` (:x:)
    + `Add README` (:white_check_mark:)

### DON'T

- 요약은 전체 커밋 메시지의 제목이므로 문장의 끝에 마침표를 적지 말아주세요.
    + `Add README.` (:x:)
    + `Add README` (:white_check_mark:)

### References

- http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html

## Pull Request 단위로 작업하는 방법

뱅크샐러드에서는 브랜치 전략으로 git flow를 사용하지 않고 있습니다. 빠른 배포를 위해, 필요한 코드에 대해 브랜치만 생성해서 작업 후에 머지하는 방식을 채택해 진행하고 있습니다.
 - [하루에 1000번 배포하는 조직 되기](https://blog.banksalad.com/tech/become-an-organization-that-deploys-1000-times-a-day/)

Pull Request를 할 때 저희 조직만의 규칙들을 소개하려고 합니다:
- Jira ticket과 description으로 브랜치를 생성합니다 
    - 예) EPT-340-change-function-name
- 코드에 주석들은 최소로 유지합니다.
    - 주석으로 코드를 이해하는 것이 아니라 코드만 봐도 동작 방식을 이해할 수 있어야 하기 때문입니다.
- Pull Request의 단위는 작게 유지합니다. 그래야 리뷰어들도 더 원활하게 리뷰할 수 있기 때문입니다. 
- [commit-train based deployment](https://blog.banksalad.com/tech/become-an-organization-that-deploys-1000-times-a-day/?gclid=Cj0KCQiA3NX_BRDQARIsALA3fIJ1dXP9Btp4Jqkze2iTPbMh2W3hlXi6ORJJsXBPvkX-d3jSDmGacx4aAphzEALw_wcB#lightweight-branching-model) 전략 을 사용 중이기 때문에 Pull Request의 title이 master(main) 브랜치의 커밋 메시지가 됩니다.
- Pull Request 내용에 맞게 title과 description을 적절히 작성합니다.
    - title, description에 jira ticket key를 명시 하면 [Autolink references](https://docs.github.com/en/github/administering-a-repository/configuring-autolinks-to-reference-external-resources) 설정에 의해 자동으로 링크가 걸립니다.
- Pull Request를 open할 때는 master에 바로 머지될 수 있는 코드들만 open합니다.
    - 논의가 필요한 코드이던가 질문이 있는 경우에는 #chapter_tech를 통해서 먼저 물어보던지 Draft로 Pull Request를 열어서 질문을 합니다.
- Pull Request의 ownership은 Pull Request를 open한 author가 가져갑니다.
    - Pull Request이 approve가 되었다면 Pull Request의 owner가 ownsership을 갖고 직접 머지합니다. 
    - 머지한 사람이 배포까지 챙깁니다.
    - 머지하고 배포를 안하면 나중에 여러개의 커밋들이 한번에 배포될 수 있습니다.
    - 장애가 발생한 경우에 어떤 커밋 때문에 장애가 발생했는지 알지 못하기 때문에 여러개의 커밋 한번에 롤백해야하는 상황이 발생합니다.

## Pull Request 리뷰하는 방법

뱅크샐러드에서는 코드리뷰 문화를 개선하려는 시도들을 항상 해왔습니다. 그래서 더 나은 코드 리뷰 문화를 위해 Pn/Dn이라는 방식을 선택했습니다. 간략하게 설명하자면, 코드리뷰를 할 때 앞에 P1~P5을 코멘트에 추가하는 것입니다. 숫자가 작을 수록 중요한 코멘트이니 반영해달라는 의미입니다. 또한, Pull Request를 open할 때 D0~D5를 라벨 혹은 표시를 합니다. 숫자가 낮을 수록 빠르게 진행해야 하는 건이니 빠르게 리뷰하고, 논의가 필요한 상황이면 적극적으로 도와달라는 의미입니다.  

자세한 내용은 다음 문서 및 쓰레드를 참고해주세요.
  - [더 나은 코드 리뷰 문화를 위한 제언](https://docs.google.com/document/d/138EUDZsd0wTHoynDIiEPURhiEqnZqABqzO02vLjPTho/edit#heading=h.5x0d5h95i329)
  - [Pull Request 리뷰 관련 쓰레드](https://rainist.slack.com/archives/C0324HT1Z/p1582118248184200)

## Git Hooks

간편한 커밋 메시지, 브랜치 이름 관리를 위해 [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks/) 스크립트를 제공합니다. 프로젝트 디렉토리에서 아래의 스크립트를 실행하면 해당 프로젝트에 커밋 메시지, 브랜치 이름을 체크하는 Git Hook이 활성화 됩니다. $GH_ACCESS_TOKEN에는 본인의 Github Access Token을 넣어주세요.

```sh
$ curl -H "Authorization: token $GH_ACCESS_TOKEN" -o .git/hooks/prepare-commit-msg --create-dirs https://raw.githubusercontent.com/banksalad/styleguide/git/hooks/prepare-commit-msg && chmod +x .git/hooks/prepare-commit-msg
```

Git Hook이 제대로 활성화 되었다면 커밋 메시지나 브랜치 이름이 위에서 설명된 양식에 맞지 않을 경우 오류메시지와 함게 커밋이 실패하게 됩니다.
