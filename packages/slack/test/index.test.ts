import { describe, expect, test } from "bun:test"

describe("session lookup refactor", () => {
  test("finds the correct session", () => {
    const sessions = new Map([
      [
        "channel1-thread1",
        {
          sessionId: "session-1",
          channel: "channel1",
          thread: "thread1",
        },
      ],
      [
        "channel2-thread2",
        {
          sessionId: "session-2",
          channel: "channel2",
          thread: "thread2",
        },
      ],
    ])

    const part = {
      sessionID: "session-2",
    }

    const correctID = [...sessions.entries()].find(
      ([_, session]) => session.sessionId === part.sessionID
    )

    expect(correctID).toBeDefined()

    const [key, correctSession] = correctID!

    expect(key).toBe("channel2-thread2")
    expect(correctSession.sessionId).toBe("session-2")
    expect(correctSession.channel).toBe("channel2")
    expect(correctSession.thread).toBe("thread2")
  })

  test("returns undefined when no session matches", () => {
    const sessions = new Map([
      [
        "channel1-thread1",
        {
          sessionId: "session-1",
          channel: "channel1",
          thread: "thread1",
        },
      ],
    ])

    const part = {
      sessionID: "session-999",
    }

    const correctID = [...sessions.entries()].find(
      ([_, session]) => session.sessionId === part.sessionID
    )

    expect(correctID).toBeUndefined()
  })
})