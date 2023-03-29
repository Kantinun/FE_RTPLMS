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

test("log in", async () => {
  render(<App />);

  fireEvent.changeText(screen.getByPlaceholderText("Username"), "ghateley0");
  fireEvent.changeText(screen.getByPlaceholderText("Password"), "BtNMJU");
  fireEvent.press(screen.getByText("Login"));

  await waitFor(()=>screen.getAllByText("รายละเอียด"));
  
});

test("add a worker to shift", async () => {

  render(<App />);

  fireEvent.changeText(
    await screen.getByPlaceholderText("Username"),
    "ghateley0"
  );
  fireEvent.changeText(await screen.getByPlaceholderText("Password"), "BtNMJU");
  await act(async ()=>fireEvent.press(await screen.getByText("Login")));

  // go to detail page
  await waitFor(async () => {
    const target = await screen.getAllByText("รายละเอียด")[0];
    await act(() => {
      fireEvent.press(target);
    });
    
  });

  // open add worker modal
  await waitFor(async ()=>{
    const workPlanTab = await screen.getByText("Work Plan");
    await act(()=>fireEvent.press(workPlanTab));
    const addWorkerBtn = await screen.getByTestId("detail-addModal");
    await act(()=>fireEvent.press(addWorkerBtn));
  
    await screen.getByText("เพิ่มพนักงาน");
  })

  // select a worker
  await waitFor(async ()=>{
    const checkbox = await screen.getAllByTestId("checkbox")[0];
    await act(()=>fireEvent.press(checkbox))
    expect(await screen.getAllByTestId("checkbox")[0].props.accessibilityState.checked).toBe(true)
  })
  
  // press next
  await waitFor(async ()=>{
    const nextBtn = await screen.getByTestId('Next');
    await act(()=>fireEvent.press(nextBtn));
  })
  
  // press confirm
  await waitFor(async ()=>{
    const confirmBtn = await screen.getByText('Confirm');
    await act(()=>fireEvent.press(confirmBtn));
  })
  
  await screen.getByText('Add worker successful')
});

test("remove a worker from shift", async () => {

  render(<App />);

  fireEvent.changeText(
    await screen.getByPlaceholderText("Username"),
    "ghateley0"
  );
  fireEvent.changeText(await screen.getByPlaceholderText("Password"), "BtNMJU");
  await act(async ()=>fireEvent.press(await screen.getByText("Login")));

  // go to detail page
  await waitFor(async () => {
    const target = await screen.getAllByText("รายละเอียด")[0];
    await act(() => {
      fireEvent.press(target);
    });
    
  });

  // open add worker modal
  await waitFor(async ()=>{
    const workPlanTab = await screen.getByText("Work Plan");
    await act(()=>fireEvent.press(workPlanTab));
    const addWorkerBtn = await screen.getByTestId("detail-removeModal");
    await act(()=>fireEvent.press(addWorkerBtn));
  
    await screen.getByText("ลดพนักงาน");
  })

  // select a worker
  await waitFor(async ()=>{
    const checkbox = await screen.getAllByTestId("checkbox")[0];
    await act(()=>fireEvent.press(checkbox))
    expect(await screen.getAllByTestId("checkbox")[0].props.accessibilityState.checked).toBe(true)
  })
  
  // press next
  await waitFor(async ()=>{
    const nextBtn = await screen.getByTestId('Next');
    await act(()=>fireEvent.press(nextBtn));
  })
  
  // press confirm
  await waitFor(async ()=>{
    const confirmBtn = await screen.getByText('Confirm');
    await act(()=>fireEvent.press(confirmBtn));
  })
  
  await screen.getByText('Remove worker successful')
});

