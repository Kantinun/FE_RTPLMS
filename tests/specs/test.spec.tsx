import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import App from "../../App";

jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);
jest.useFakeTimers();
test("default test", async () => {
  render(<App />);
  screen.getByPlaceholderText("Username");
  screen.getByPlaceholderText("Password");
});

describe("manager use cases", () => {
  // define test data
  const mngUsername = "ghateley0";
  const mngPassword = "BtNMJU";

  test("log in", async () => {
    render(<App />);

    fireEvent.changeText(
      await screen.getByPlaceholderText("Username"),
      mngUsername
    );
    fireEvent.changeText(
      await screen.getByPlaceholderText("Password"),
      mngPassword
    );
    fireEvent.press(await screen.getByText("Login"));

    await waitFor(async () => await screen.getAllByText("รายละเอียด"));
  });
  describe("manages work plan", () => {
    describe("add a worker to shift", () => {
      describe("given 1 selected worker", () => {
        it('should see "Add worker successful" message', async () => {
          render(<App />);

          // login
          fireEvent.changeText(
            await screen.getByPlaceholderText("Username"),
            mngUsername
          );
          fireEvent.changeText(
            await screen.getByPlaceholderText("Password"),
            mngPassword
          );
          await act(async () =>
            fireEvent.press(await screen.getByText("Login"))
          );

          // go to detail page
          await waitFor(async () => {
            const target = await screen.getAllByText("รายละเอียด")[0];
            await act(() => {
              fireEvent.press(target);
            });
          });

          // open add worker modal
          await waitFor(async () => {
            const workPlanTab = await screen.getByText("Work Plan");
            await act(() => fireEvent.press(workPlanTab));
            const addWorkerBtn = await screen.getByTestId("detail-addModal");
            await act(() => fireEvent.press(addWorkerBtn));

            await screen.getByText("เพิ่มพนักงาน");
          });

          // select a worker
          await waitFor(async () => {
            const checkbox = await screen.getAllByTestId("checkbox")[0];
            await act(() => fireEvent.press(checkbox));
            expect(
              await screen.getAllByTestId("checkbox")[0].props
                .accessibilityState.checked
            ).toBe(true);
          });

          // press next
          await waitFor(async () => {
            const nextBtn = await screen.getByTestId("Next");
            await act(() => fireEvent.press(nextBtn));
          });

          // press confirm
          await waitFor(async () => {
            const confirmBtn = await screen.getByText("Confirm");
            await act(() => fireEvent.press(confirmBtn));
          });

          await screen.getByText("Add worker successful");
        });
      });
    });

    describe("remove a worker from shift", () => {
      describe("given 1 selected worker", () => {
        it('should see "Remove worker successful" message', async () => {
          render(<App />);

          // login
          fireEvent.changeText(
            await screen.getByPlaceholderText("Username"),
            mngUsername
          );
          fireEvent.changeText(
            await screen.getByPlaceholderText("Password"),
            mngPassword
          );
          await act(async () =>
            fireEvent.press(await screen.getByText("Login"))
          );

          // go to detail page
          await waitFor(async () => {
            await act(async () => {
              fireEvent.press(await screen.getAllByText("รายละเอียด")[0]);
            });
          });

          // open add worker modal
          await waitFor(async () => {
            const workPlanTab = await screen.getByText("Work Plan");
            await act(() => fireEvent.press(workPlanTab));
            const addWorkerBtn = await screen.getByTestId("detail-removeModal");
            await act(() => fireEvent.press(addWorkerBtn));

            await screen.getByText("ลดพนักงาน");
          });

          // select a worker
          await waitFor(async () => {
            const checkbox = await screen.getAllByTestId("checkbox")[0];
            await act(() => fireEvent.press(checkbox));
            expect(
              await screen.getAllByTestId("checkbox")[0].props
                .accessibilityState.checked
            ).toBe(true);
          });

          // press next
          await waitFor(async () => {
            const nextBtn = await screen.getByTestId("Next");
            await act(() => fireEvent.press(nextBtn));
          });

          // press confirm
          await waitFor(async () => {
            const confirmBtn = await screen.getByText("Confirm");
            await act(() => fireEvent.press(confirmBtn));
          });

          await screen.getByText("Remove worker successful");
        });
      });
    });
  });

  describe("manages OT request", () => {
    describe('add OT request by "จำหน่ายงานตามลำดับการเข้างาน" method', () => {
      it('should see "Add OT request successful" message', async () => {});
      it('should see "Remove OT request failed" message', async () => {});
    });
    describe('add OT request by "ทุกคนในกะ" method', () => {
      it('should see "Add OT request successful" message', async () => {});
      it('should see "Remove OT request failed" message', async () => {});
    });
    describe('add OT request by "เลือกพนักงานด้วยตนเอง" method', () => {
      it('should see "Add OT request successful" message', async () => {});
      it('should see "Remove OT request failed" message', async () => {});
    });
    describe('add OT request by "กำหนดเอง" method', () => {
      it('should see "Add OT request successful" message', async () => {});
      it('should see "Remove OT request failed" message', async () => {});
    });
  });
});
