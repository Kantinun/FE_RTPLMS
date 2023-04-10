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
test.skip("default test", async () => {
  render(<App />);
  screen.getByPlaceholderText("Username");
  screen.getByPlaceholderText("Password");
});

describe("MANAGER: USECASE", () => {
  // define test data
  const mngUsername = "ghateley0";
  const mngPassword = "BtNMJU";

  const mngWrongUsername = "ghateleyO";
  const mngWrongPassword = "BtNMJo";

  describe.skip("Manager LOG-IN", () => {
    it("Valid Account", async () => {
      render(<App />);
      fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        await act(async () =>
          fireEvent.press(await screen.getByText("Login"))
        );
      await waitFor(async () => {
        await screen.getAllByText("รายละเอียด")
      });
    });

    it("InValid UserAccount", async () => {
      render(<App />);
      fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
      fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
      await act(async () =>
        fireEvent.press(await screen.getByText("Login"))
      );
      await waitFor(async () => {
        const element = await screen.queryByText("Email or Password incorrect");
      });
    });

    it("InValid Password", async () => {
      render(<App />);
      fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngWrongUsername);
      fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
      await act(async () =>
        fireEvent.press(await screen.getByText("Login"))
      );
      await waitFor(async () => {
        const element = await screen.queryByText("Email or Password incorrect");
      });
    });
  });
  describe.skip("Dashboard", () => {
    it("Have Data", async () => {
      render(<App />);
      fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
      fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
      await act(async () =>
        fireEvent.press(await screen.getByText("Login"))
      );
      await waitFor(async () => {
        await screen.getAllByText("รายละเอียด")
      });
      await screen.getAllByTestId("DepartmentCard")
      

    });
  });
  describe.skip("Manage work plan", () => {
    describe("Add Worker", () => {
      it('1 Worker' , async () => {
        render(<App />);
        // login
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
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
      it('more than 1 Worker' , async () => { 
        render(<App />);
        // login
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
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
          for (let i = 0; i < 2; i++) {
            const checkbox = await screen.getAllByTestId("checkbox")[i];
            await act(() => fireEvent.press(checkbox));
            expect(
              await screen.getAllByTestId("checkbox")[i].props
                .accessibilityState.checked
            ).toBe(true);
          }
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
      it('Cancle / 0 Worker' , async () => {
        render(<App />);
        // login
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
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

        await screen.getByText("Add worker failed");
      });
    });
    describe("Remove Worker", () => {
      it('1 Worker' , async () => {
        render(<App />);
        // login
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
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
      it('more than 1 Worker' , async () => { //#Coding
        render(<App />);
        // login
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
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
          const addWorkerBtn = await screen.getByTestId("detail-removeModal");
          await act(() => fireEvent.press(addWorkerBtn));

          await screen.getByText("ลดพนักงาน");
        });

        // select a worker
        await waitFor(async () => {
          for (let i = 0; i < 2; i++) {
            const checkbox = await screen.getAllByTestId("checkbox")[i];
            await act(() => fireEvent.press(checkbox));
            expect(
              await screen.getAllByTestId("checkbox")[i].props
                .accessibilityState.checked
            ).toBe(true);
          }
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
      it('Cancle / 0 Worker' , async () => {
        render(<App />);
        // login
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
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
          const addWorkerBtn = await screen.getByTestId("detail-removeModal");
          await act(() => fireEvent.press(addWorkerBtn));

          await screen.getByText("ลดพนักงาน");
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

        await screen.getByText("Remove worker failed");
      });
    });
  });

  describe.skip("Manages OT request", () => {
    describe.skip("ADD OT" , () => {
      describe('"เลือกพนักงานด้วยตนเอง" method', () => {
        it('1 OT Request', async () => {
          render(<App />);
          // login
          fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
          fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
          await act(async () =>fireEvent.press(await screen.getByText("Login")));
          
          // go to detail page
          await waitFor(async () => {
            await act(async () => {
              fireEvent.press(await screen.getAllByText("รายละเอียด")[0]);
            });
          });
          // open add OT modal
          const otPlanTab = await screen.getByText("OT Plan");
          await act(() => fireEvent.press(otPlanTab));
          await waitFor(async () => {
            const addOTBtn = await screen.getByTestId("detail-addModal");//line407
            await act(() => fireEvent.press(addOTBtn));
          });
          await screen.getByText("เพิ่มงานล่วงเวลา");
          const dropdown = screen.getByTestId("select-assign-method");
          await act(() => {
            fireEvent.press(dropdown);
          });
          // const labelToSelect = "เลือกพนักงานด้วยตนเอง";
          const labelToSelect = "manual_select_worker";
          await waitFor(async ()=> {
            const Option2 = await screen.getByTestId(labelToSelect);
            await act(() => {
              fireEvent.press(Option2);
            });
          });

          

          // const optionToSelect = Array.from(dropdown.options).find(option => option.text === labelToSelect);
          // if (optionToSelect) {
          //   dropdown.value = optionToSelect.value;
          // }
          // await waitFor(async () => { // app/components/Modal/add_del_ot_modal.tsx
          //   dropdown.options[dropdown.selectedIndex];
          // }); 
              
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

          await screen.getByText("Add OT successful");
          
        });
        it('more than 1 OT Requests', async () => { //#Coding
          render(<App />);
          // login
          fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
          fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
          await act(async () =>fireEvent.press(await screen.getByText("Login")));
          
          // go to detail page
          await waitFor(async () => {
            await act(async () => {
              fireEvent.press(await screen.getAllByText("รายละเอียด")[0]);
            });
          });
          // open add OT modal
          await waitFor(async () => {
            const otPlanTab = await screen.getByText("OT Plan"); //line442 DetailScreen.tsx
            await act(() => fireEvent.press(otPlanTab));
          });
          const addOTBtn = await screen.getByTestId("detail-addModal");//line407
          await act(() => fireEvent.press(addOTBtn));

          await screen.getByText("เพิ่มงานล่วงหน้า");
          //Select method 
          const selectd_method = 0;
          await waitFor(async () => { // app/components/Modal/add_del_ot_modal.tsx
            const dropdown_element = await screen.getByPlaceholderText("เลือกวิธีการจำหน่ายงาน");
            dropdown_element.selectedIndex = selectd_method;
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

          await screen.getByText("Add OT successful");
        });

        it('Cancle / 0 OT Requests', async () => {
        });
      });
      describe('"ทุกคนในกะ" method', () => {
        it('default', async () => {
          render(<App />);

          // login
          fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
          fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
          await act(async () =>fireEvent.press(await screen.getByText("Login")));
          
          // go to detail page
          await waitFor(async () => {
            await act(async () => {
              fireEvent.press(await screen.getAllByText("รายละเอียด")[0]);
            });
          });
          // open add worker modal
          await waitFor(async () => {
            const otPlanTab = await screen.getByText("OT Plan"); //line442 DetailScreen.tsx
            await act(() => fireEvent.press(otPlanTab));
            const addOTBtn = await screen.getByTestId("detail-addModal");//line407
            await act(() => fireEvent.press(addOTBtn));

            //await screen.getByText("ลดพนักงาน");
            //Select method 
            const selectd_method = 1;
            await waitFor(async () => { // app/components/Modal/add_del_ot_modal.tsx
              const dropdown_element = await screen.getByPlaceholderText("เลือกวิธีการจำหน่ายงาน");
              dropdown_element.selectedIndex = selectd_method;
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

            await screen.getByText("Add OT successful");
          });

        });
      });
      describe('"กำหนดเอง" method', () => {
        it('default', async () => {
          render(<App />);

          // login
          fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
          fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
          await act(async () =>fireEvent.press(await screen.getByText("Login")));
          
          // go to detail page
          await waitFor(async () => {
            await act(async () => {
              fireEvent.press(await screen.getAllByText("รายละเอียด")[0]);
            });
          });
          // open add worker modal
          await waitFor(async () => {
            const otPlanTab = await screen.getByText("OT Plan"); //line442 DetailScreen.tsx
            await act(() => fireEvent.press(otPlanTab));
            const addOTBtn = await screen.getByTestId("detail-addModal");//line407
            await act(() => fireEvent.press(addOTBtn));

            //await screen.getByText("ลดพนักงาน");
            //Select method 
            const selectd_method = 1;
            await waitFor(async () => { // app/components/Modal/add_del_ot_modal.tsx
              const dropdown_element = await screen.getByPlaceholderText("เลือกวิธีการจำหน่ายงาน");
              dropdown_element.selectedIndex = selectd_method;
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

            await screen.getByText("Add OT successful");
          });

        });
      });
    });
    describe("Remove OT" , () => {
        it('1 OT Request', async () => {
          render(<App />);
          // login
          fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
          fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
          await act(async () =>fireEvent.press(await screen.getByText("Login")));
          
          // go to detail page
          await waitFor(async () => {
            await act(async () => {
              fireEvent.press(await screen.getAllByText("รายละเอียด")[0]);
            });
          });
          // open add OT modal
          const otPlanTab = await screen.getByText("OT Plan");
          await act(() => fireEvent.press(otPlanTab));
          await waitFor(async () => {
            const addOTBtn = await screen.getByTestId("detail-removeModal");//line413
            await act(() => fireEvent.press(addOTBtn));
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

          await screen.getByText("Remove OT successful");

        });
        it('more than OT Requests', async () => {
          render(<App />);
          // login
          fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
          fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
          await act(async () =>fireEvent.press(await screen.getByText("Login")));
          
          // go to detail page
          await waitFor(async () => {
            await act(async () => {
              fireEvent.press(await screen.getAllByText("รายละเอียด")[0]);
              });
            });
            // open remove OT modal
          // await waitFor(async () => {
            const otPlanTab = await screen.getByText("OT Plan"); //line442 DetailScreen.tsx
            await act(() => fireEvent.press(otPlanTab));
          // });
          
            const addOTBtn = await screen.getByTestId("detail-removeModal");//line413
            await act(() => fireEvent.press(addOTBtn));

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

            await screen.getByText("Remove OT successful");
          
        });
    });
  });

describe("Worker: USECASE", () => {
  const wUsername = "nhuddlestone0";
  const wPassword = "IvKtoPdlINh";

  describe("Schedule page",() => {
    it("Go to page",async () =>{
      render(<App />);
      fireEvent.changeText(
        await screen.getByPlaceholderText("Username"),wUsername);
        
      fireEvent.changeText(
        await screen.getByPlaceholderText("Password"),wPassword);
      fireEvent.press(await screen.getByText("Login"));
      await waitFor(async () => await screen.getAllByText("Tasks Plan"));
    });

  });

  describe("OT Request page",() => {
    it("Go to page",async () =>{
      render(<App />);
      fireEvent.changeText(
        await screen.getByPlaceholderText("Username"),wUsername);
      fireEvent.changeText(
        await screen.getByPlaceholderText("Password"),wPassword);
      fireEvent.press(await screen.getByText("Login"));
      await waitFor(async () => await screen.getAllByText("Tasks Plan"));
      //go to page
      await waitFor(async () => {
        const target = await screen.getAllByText("OT Requests")[0];
        await act(() => {
          fireEvent.press(target);
        });
      });

    });
    
    it("Accept", async ()=>{
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
        console.log(ot_btn);
        await act(() => {
          fireEvent.press(ot_btn);
        });
      });
      await waitFor(async () => {
        const acp_btn = screen.getByTestId("accept-btn")[0];
        await act(() => {
          fireEvent.press(acp_btn);
        });
      });
    });
    it("Reject", async ()=>{
      render(<App />);
      fireEvent.changeText(
      await screen.getByPlaceholderText("Username"),wUsername);
      fireEvent.changeText(
      await screen.getByPlaceholderText("Password"),wPassword);
      fireEvent.press(await screen.getByText("Login"));
      await waitFor(async () => await screen.getAllByText("Tasks Plan"));
      //go to page
      await waitFor(async () => {
        const target = await screen.getAllByText("OT Requests")[0];
        await act(() => {
          fireEvent.press(target);
        });
      });
      await waitFor(async () => {
        const acp_btn = screen.getByTestId("reject-btn")[0];
        await act(() => {
          fireEvent.press(acp_btn);
        });
      });

    });
});


});
});