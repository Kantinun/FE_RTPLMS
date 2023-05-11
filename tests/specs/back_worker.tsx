const wUsername = "nhuddlestone0";
const wPassword = "IvKtoPdlINh";
const wWrongUsername = "nhuddlestone0";
const wWrongPassword = "IvKtoPdlINh";


describe("Worker", () => {
    describe("login", () => {
      it("Both Valid", async () => {
        //login
        render(<App />);
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),wUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),wPassword);
        fireEvent.press(await screen.getByText("Login"));
        expect(async () => await screen.getAllByText("Tasks Plan")).toBeDefined(); 
      });
  
      it("InValid UserAccount", async () => {
        render(<App />);
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),wWrongUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),wPassword);
        fireEvent.press(await screen.getByText("Login"))
        await waitFor(async () => {
          // await screen.queryByText("Email or Password incorrect")
          expect(screen.queryByText("Email or Password incorrect")).toBeDefined();
        });
      });
  
      it("InValid Password", async () => {
        render(<App />);
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),wUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),wWrongPassword);
        fireEvent.press(await screen.getByText("Login"))
        await waitFor(async () => {
          // await screen.queryByText("Email or Password incorrect")
          expect(screen.queryByText("Email or Password incorrect")).toBeDefined();
        });
      });
      it("Both Invalid", async () => {
        render(<App />);
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),wWrongUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),wWrongPassword);
        fireEvent.press(await screen.getByText("Login"))
        await waitFor(async () => {
          // await screen.queryByText("Email or Password incorrect")
          expect(screen.queryByText("Email or Password incorrect")).toBeDefined();
        });
      });
    });
    describe("Schedule page",() => {
        it("Go to page",async () =>{
          render(<App />);
          fireEvent.changeText(await screen.getByPlaceholderText("Username"),wUsername);
          fireEvent.changeText(await screen.getByPlaceholderText("Password"),wPassword);
          fireEvent.press(await screen.getByText("Login"));
          expect(async () => await screen.getAllByText("Tasks Plan")).toBeDefined(); 
        });
    });
    describe("OT Request page",() => {
        it("Go to page",async () =>{
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),wUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),wPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const task_plan = await screen.getAllByText("Tasks Plan");
          expect(task_plan).toBeDefined();
        }); 
        //
        await waitFor(async () => {
          const target = await screen.getAllByText("OT Requests")[0];
          await act(() => fireEvent.press(target));
        });
        await waitFor(async () => {
          const header_log = await screen.getAllByText("ยอมรับ")[0];
          expect(header_log).toBeDefined();
        }); 
    
        });
        it("Accept", async ()=>{
          //login
          render(<App />);      
          fireEvent.changeText(await screen.getByPlaceholderText("Username"),wUsername);
          fireEvent.changeText(await screen.getByPlaceholderText("Password"),wPassword);
          fireEvent.press(await screen.getByText("Login"));
          await waitFor(async () => {
            const task_plan = await screen.getAllByText("Tasks Plan");
            expect(task_plan).toBeDefined();
          }); 
          //
          await waitFor(async () => {
            const target = await screen.getAllByText("OT Requests")[0];
            await act(() => fireEvent.press(target));
          });
          await waitFor(async () => {
            const header_log = await screen.getAllByText("ยอมรับ")[0];
            expect(header_log).toBeDefined();
          }); 
          await waitFor(async () => {
            const acp_btn = screen.getByTestId("accept-btn");
            await act(() => fireEvent.press(acp_btn));
          });
    
        });
        it("Reject", async ()=>{ // not enough request
          render(<App />);
          fireEvent.changeText(
          await screen.getByPlaceholderText("Username"),wUsername);
          fireEvent.changeText(
          await screen.getByPlaceholderText("Password"),wPassword);
          fireEvent.press(await screen.getByText("Login"));
          await waitFor(async () => await screen.getAllByText("Tasks Plan"));
          //go to page
          await waitFor(async () => {
            const ot_btn = await screen.getAllByText("OT Requests")[0];
            await act(() => fireEvent.press(ot_btn));
          });
          await waitFor(async () => {
            // const rjb_btn = screen.getByTestId("reject-btn");
            // await act(() => fireEvent.press(rjb_btn));
          });
    
        });
      });
});
