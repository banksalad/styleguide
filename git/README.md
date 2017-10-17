# Rainist Git Commit Message Style Guide

레이니스트 엔지니어링 팀에서 지향하는 Git commit message 스타일 가이드입니다. 좋은 Git commit message(이하 커밋 메시지)를 작성하는 일은 그리 쉬운 일이 아닙니다. 이에 저희가 생각하는 좋은 커밋 메시지의 형태에 대한 생각을 공유합니다.

## Structure

커밋 메시지는 다음의 형태로 작성해주세요.

```
Short (50 chars or less) summary of changes

Additional explanation if necessary.

#issue or https://your-reference.com/link
```

## DO

- 요약은 반드시 영어로 작성해주세요.
    + 이는 오픈 소스 코드 저장소를 참고하거나 저장소에 기여할 때의 장벽을 낮춰주는 훈련이 됩니다.
- 언제나 요약은 명령문 형태로 작성해주세요. 주어를 따로 적지 않고 동사로 문장을 시작하며 늘 동사 원형을 사용합니다.
    + `I added README` :x:
    + `I add README` :x:
    + `Added README` :x:
    + `Adds README` :x:
    + `Add README` :white_check_mark:

## DON'T

- 요약은 전체 커밋 메시지의 제목이므로 문장의 끝에 마침표를 적지 말아주세요.
    + `Add README.` :x:
    + `Add README` :white_check_mark:

## References

- http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
