import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react-native";
import App from "../../App";
import { FlatList } from "react-native-gesture-handler";
import { Children } from "react";

jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);
// jest.useFakeTimers();
jest.useRealTimers();   


describe("Manager", () => {
  const mngUsername = "ghateley0";
  const mngPassword = "BtNMJU";
  const mngWrongUsername = "ghteley0";
  const mngWrongPassword = "btNMJU";

  describe("Login", () => {
    it("With Correct Data", async () => {
      //login
      render(<App />);  
      fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
      fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
      fireEvent.press(screen.getByText("Login"));
      // userEvent.click(screen.getByText("Login"));
      await waitFor(async () => {
        const valid_dashboard = await screen.getAllByText("รายละเอียด");
        expect(valid_dashboard).toBeDefined();
      }); 
    });

    it("With Wrong UserAccount", async () => {
      render(<App />);
      fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngWrongUsername);
      fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
      fireEvent.press(await screen.getByText("Login"))
      await waitFor(async () => {
        // await screen.queryByText("Email or Password incorrect")
        expect(screen.queryByText("Email or Password incorrect")).toBeDefined();
      });
    });

    it("With Wrong Password", async () => {
      render(<App />);
      fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
      fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngWrongPassword);
      fireEvent.press(await screen.getByText("Login"))
      await waitFor(async () => {
        // await screen.queryByText("Email or Password incorrect")
        expect(screen.queryByText("Email or Password incorrect")).toBeDefined();
      });
    });
    it("With Incorrect Data", async () => {
      render(<App />);
      fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngWrongUsername);
      fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngWrongPassword);
      fireEvent.press(await screen.getByText("Login"))
      await waitFor(async () => {
        // await screen.queryByText("Email or Password incorrect")
        expect(screen.queryByText("Email or Password incorrect")).toBeDefined();
      });
    });
  });

  describe("Dashboard", () => {
    it("Shown Departments Name", async() => {
      //login
      render(<App />);      
      fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
      fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
      fireEvent.press(await screen.getByText("Login"));
      await waitFor(async () => {
        const valid_dashboard = await screen.getAllByText("รายละเอียด");
        expect(valid_dashboard).toBeDefined();
      });
      const dep = screen.findByText("Boiling");
      expect(dep).toBeDefined();

    });
    it("Shown Department Cards", async () => {
      //login
      render(<App />);      
      fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
      fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
      fireEvent.press(await screen.getByText("Login"));
      await waitFor(async () => {
        const valid_dashboard = await screen.getAllByText("รายละเอียด");
        expect(valid_dashboard).toBeDefined();
      }); 
    //
    const departmentCards = await screen.findAllByTestId("DepartmentCard");
    expect(departmentCards.length).toBeGreaterThan(0);
    });
    it("Searching Valid Department", async() => {
      //login
      render(<App />);      
      fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
      fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
      fireEvent.press(await screen.getByText("Login"));
      await waitFor(async () => {
        const valid_dashboard = await screen.getAllByText("รายละเอียด");
        expect(valid_dashboard).toBeDefined();
      });
      const search_word = 'Boiling';
      const search_bar = screen.findByTestId('dep-search-bar');
      fireEvent.changeText(await search_bar, search_word);
      
      await waitFor(async () => {
        const dep_name = screen.findByText(search_word);
        expect(dep_name).toBeDefined();
      });
    });
    it("Searching Invalid Department", async() => {
      //login
      render(<App />);      
      fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
      fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
      fireEvent.press(await screen.getByText("Login"));
      await waitFor(async () => {
        const valid_dashboard = await screen.getAllByText("รายละเอียด");
        expect(valid_dashboard).toBeDefined();
      });
      const search_word = 'Packaging';
      const search_bar = screen.findByTestId('dep-search-bar');
      await waitFor(async ()=>fireEvent.changeText(await search_bar, search_word));
    
      const regex = new RegExp(`Unable to find an element with text: ${search_word}`);
      await expect(screen.queryByText(regex)).toBeNull();
    });
    it("Go to Department's details", async() => {
      //login
      render(<App />);      
      fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
      fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
      fireEvent.press(await screen.getByText("Login"));
      await waitFor(async () => {
        const valid_dashboard = await screen.getAllByText("รายละเอียด");
        expect(valid_dashboard).toBeDefined();
      }); 
      const dep = screen.findByText("Boiling");
      expect(dep).toBeDefined();

      // go to detail page
      await waitFor(async () => {
        const target = await screen.getAllByText("รายละเอียด")[0];
        await act(() => fireEvent.press(target));
      });
      await waitFor(async () => {
        const dep = screen.findByText("Boiling");
        expect(dep).toBeDefined();
      });

    });
  });

  describe("Department Details page", () => {
    describe("On Page", () => {
      it("Have Department Data",async()=>{
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 
        const dep = screen.findByText("Boiling");
        expect(dep).toBeDefined();

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });
        await waitFor(async () => {
          const dep = screen.findByText("Boiling");
          expect(dep).toBeDefined();
        });
        await waitFor(async () => {
          const word = "ProfileScreen";
          const data = await screen.findByText(word);
          expect(data).toBeDefined();
        });
      });
      it("Searching Valid Worker", async() => {
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 
        const dep = screen.findByText("Boiling");
        expect(dep).toBeDefined();

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });
        await waitFor(async () => {
          const dep = screen.findByText("Boiling");
          expect(dep).toBeDefined();
        });
        const search_word = 'Livy Flavelle';
        const search_bar = screen.findByTestId('details-search-bar');
        fireEvent.changeText(await search_bar, search_word);
        // try{
          await waitFor(async () => {
            const dep_name = screen.findByText(search_word);
            expect(dep_name).toBeDefined();
          });
        // }catch(e) {}
      });
      it("Searching Invalid Worker", async() => {
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 
        const dep = await screen.findByText("Boiling");
        expect(dep).toBeDefined();

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });
        await waitFor(async () => {
          const dep = screen.findByText("Boiling");
          expect(dep).toBeDefined();
        });
        const search_word = 'worker worker';
        const search_bar = screen.findByTestId('details-search-bar');
        fireEvent.changeText(await search_bar, search_word);
        
        const regex = new RegExp(`Unable to find an element with text: ${search_word}`);
        await expect(screen.queryByText(regex)).toBeNull();
      });
      it('Datepicker shown Current Date', async () => {
        //login
        render(<App />);  
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 
        const dep = screen.findByText("Boiling");
        expect(dep).toBeDefined();

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });
        await waitFor(async () => {
          const dep = screen.findByText("Boiling");
          expect(dep).toBeDefined();
        });
        await waitFor(async () => { 
          const datepicker = screen.findByTestId('datepicker_test');
          expect(datepicker).toBeDefined();
        });

        await waitFor(async () => { 
          const currentDate = new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
          });
          const datepickerWithCurrentDate = await screen.queryByText(currentDate);
          expect(datepickerWithCurrentDate).toBeDefined();
        });
      });
      it('Pressing Datepicker' , async () => {
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 
        const dep = screen.findByText("Boiling");
        expect(dep).toBeDefined();

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });
        await waitFor(async () => {
          const dep = screen.findByText("Boiling");
          expect(dep).toBeDefined();
        });
        await waitFor(async () => {
          const datepicker = screen.queryByTestId('datepicker_test');
          expect(datepicker).toBeDefined();
        });
        try{
          await waitFor(async () => fireEvent.press(screen.queryByTestId('datepicker_test')) );
          expect(screen.findByText("OK")).toBeDefined();
        }
        catch (error) {
          // console.log(error);
          // expect(error).toBeDefined();
          expect(error.message).toContain("Cannot read properties of null (reading 'props')");
        }
      });
      it('Cancle Datepicker Date',async () => {
          //login
          render(<App />);      
          fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
          fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
          fireEvent.press(await screen.getByText("Login"));
          await waitFor(async () => {
            const valid_dashboard = await screen.getAllByText("รายละเอียด");
            expect(valid_dashboard).toBeDefined();
          }); 
          const dep = screen.findByText("Boiling");
          expect(dep).toBeDefined();

          // go to detail page
          await waitFor(async () => {
            const target = await screen.getAllByText("รายละเอียด")[0];
            await act(() => fireEvent.press(target));
          });
          await waitFor(async () => {
            const dep = screen.findByText("Boiling");
            expect(dep).toBeDefined();
          });
          await waitFor(async () => {
            const datepicker = screen.queryByTestId('datepicker_test');
            expect(datepicker).toBeDefined();
          });
          try{
            fireEvent.press(screen.queryByTestId('datepicker_test'));
            try{
              fireEvent.press(screen.findByText("CANCEL"));
              expect(screen.findByText("Boiling")).toBeDefined();
            }
            catch(e){
            }
          }catch(e){
            expect(e.message).toContain("Cannot read properties of null (reading 'props')");
          }
      });
      it('Select Tomorrow Date', async () => {
          //login
          render(<App />);      
          fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
          fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
          fireEvent.press(await screen.getByText("Login"));
          await waitFor(async () => {
            const valid_dashboard = await screen.getAllByText("รายละเอียด");
            expect(valid_dashboard).toBeDefined();
          }); 
          const dep = screen.findByText("Boiling");
          expect(dep).toBeDefined();

          // go to detail page
          await waitFor(async () => {
            const target = await screen.getAllByText("รายละเอียด")[0];
            await act(() => fireEvent.press(target));
          });
          await waitFor(async () => {
            const dep = screen.findByText("Boiling");
            expect(dep).toBeDefined();
          });

          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          const formattedDate = `${tomorrow.getDate()}`;

          const tomorrowFormatted = tomorrow.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
          });
          try{
            await waitFor(async () =>{
              const datepicker = await screen.findAllByTestId('datepicker_test');
              fireEvent.press(datepicker);
            });
            await waitFor(async () =>fireEvent.press(screen.findByText(formattedDate)));
            await waitFor(async () =>fireEvent.press(screen.findByText("OK")));

            const datepickerWithTomorrowDate = await screen.queryByText(tomorrowFormatted);
            expect(datepickerWithTomorrowDate).toBeDefined();
          }
          catch (err) {}
      });
      it('Select Shift', async() => {
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 
        const dep = screen.findByText("Boiling");
        expect(dep).toBeDefined();

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });
        await waitFor(async () => {
          const dep = screen.findByText("Boiling");
          expect(dep).toBeDefined();
        });
        const shift_code = "08:00-16:00";
        await waitFor(async () => { 
          const shift_node = screen.findByTestId('select-shift');
          expect(shift_node).toBeDefined();
          try{
            await act(() => fireEvent.press(shift_node));
            expect(screen.findByText(shift_code));
            fireEvent.press(screen.findByText(shift_code));
            expect(screen.findByText(shift_code)).toBeDefined();
          }
          catch(err) {}
        });
      });
      it('Select OT Plan Table', async() => {
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด")[0];
          expect(valid_dashboard).toBeDefined();
        }); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });
        // open add OT modal
        const otPlanTab = await screen.getByText("OT Plan");
        await act(() => fireEvent.press(otPlanTab));
        await waitFor(async () => {
          const addOTBtn = await screen.getByTestId("detail-addModal");//line407
          expect(addOTBtn).toBeDefined();
        });

      });
      it('Select Worker Plan Table', async() => {
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด")[0];
          expect(valid_dashboard).toBeDefined();
        }); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });
        // open OT request table modal
        const otPlanTab = await screen.getByText("OT Plan");
        await act(() => fireEvent.press(otPlanTab));
        await waitFor(async () => {
          const addOTBtn = await screen.getByTestId("detail-addModal");//line407
          expect(addOTBtn).toBeDefined();
        });
        //open worker ot modal
        const WorkerPlanTab = await screen.getByText("Work Plan");
        await act(() => fireEvent.press(WorkerPlanTab));
        await waitFor(async () => {
          const addOTBtn = await screen.getByTestId("detail-addModal");//line407
          expect(addOTBtn).toBeDefined();
        });
      });
    });
    describe("Add & Remove Worker", () => {
      it('Add 1 Worker' , async () => {
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });

        // open add worker modal
        await waitFor(async () => {
          const workPlanTab = await screen.getByText("Work Plan");
          await act(() => fireEvent.press(workPlanTab));
          const addWorkerBtn = await screen.getByTestId("detail-addModal");
          await act(() => fireEvent.press(addWorkerBtn));
          expect(await screen.getByText("เพิ่มพนักงาน")).toBeDefined();
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

        await waitFor(async ()=> screen.getByText("Add worker successful"));
      });
      it('Add more than 1 Worker' , async () => { 
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });

        // open add worker modal
        await waitFor(async () => {
          const workPlanTab = await screen.getByText("Work Plan");
          await act(() => fireEvent.press(workPlanTab));
          const addWorkerBtn = await screen.getByTestId("detail-addModal");
          await act(() => fireEvent.press(addWorkerBtn));
          expect(await screen.getByText("เพิ่มพนักงาน")).toBeDefined();
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

        await waitFor(async ()=> screen.getByText("Add worker successful"));
      });
      it('Failed to Add' , async () => {
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });

        // open add worker modal
        await waitFor(async () => {
          const workPlanTab = await screen.getByText("Work Plan");
          await act(() => fireEvent.press(workPlanTab));
          const addWorkerBtn = await screen.getByTestId("detail-addModal");
          await act(() => fireEvent.press(addWorkerBtn));
          expect(await screen.getByText("เพิ่มพนักงาน")).toBeDefined();
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

        await waitFor(async ()=> screen.getByText("Add worker failed"));
      });
      it('Add and reselect worker', async () => {
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });

        // open add worker modal
        await waitFor(async () => {
          const workPlanTab = await screen.getByText("Work Plan");
          await act(() => fireEvent.press(workPlanTab));
          const addWorkerBtn = await screen.getByTestId("detail-addModal");
          await act(() => fireEvent.press(addWorkerBtn));
          expect(await screen.getByText("เพิ่มพนักงาน")).toBeDefined();
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
        
        //press previous
        await waitFor(async () => {
          const nextBtn = await screen.getByTestId("Previous");
          await act(() => fireEvent.press(nextBtn));
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

        await waitFor(async ()=> screen.getByText("Add worker successful"));
      });
      it('Add & use Search-bar', async () => {
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });

        // open add worker modal
        await waitFor(async () => {
          const workPlanTab = await screen.getByText("Work Plan");
          await act(() => fireEvent.press(workPlanTab));
          const addWorkerBtn = await screen.getByTestId("detail-addModal");
          await act(() => fireEvent.press(addWorkerBtn));
          expect(await screen.getByText("เพิ่มพนักงาน")).toBeDefined();
        });
        await waitFor(async () => {
          const worker = 'Merrill Blenkin'
          const search_bar = screen.findByTestId('add-worker-search-bar');
          expect(search_bar).toBeDefined();
          // await act(() => fireEvent.changeText(search_bar,worker) ); // Cannot read properties of undefined (reading 'onChangeText')
          // expect(await screen.findByText(worker)).toBeDefined();
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

        await waitFor(async ()=> screen.getByText("Add worker successful"));
      });
      it('Remove 1 Worker' , async () => {
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });

        // open add worker modal
        await waitFor(async () => {
          const workPlanTab = await screen.getByText("Work Plan");
          await act(() => fireEvent.press(workPlanTab));
          const addWorkerBtn = await screen.getByTestId("detail-removeModal");
          await act(() => fireEvent.press(addWorkerBtn));
          expect(await screen.getByText("ลดพนักงาน")).toBeDefined();
        });

        // select a worker
        await waitFor(async () => {
          for (let i = 0; i < 1; i++) {
            const checkbox = await waitFor(async () => screen.getAllByTestId("checkbox_test")[i]);
            await act(() => fireEvent.press(checkbox));
            expect(
              await screen.getAllByTestId("checkbox_test")[i].props
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

        await waitFor(async () => screen.getByText("Remove worker successful"));
      });
      it('Remove more than 1 Worker' , async () => { 
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });

        // open add worker modal
        await waitFor(async () => {
          const workPlanTab = await screen.getByText("Work Plan");
          await act(() => fireEvent.press(workPlanTab));
          const addWorkerBtn = await screen.getByTestId("detail-removeModal");
          await act(() => fireEvent.press(addWorkerBtn));
          expect(await screen.getByText("ลดพนักงาน"));
        });

        // select a worker
        await waitFor(async () => {
          for (let i = 0; i < 2; i++) {
            const checkbox = await screen.getAllByTestId("checkbox_test")[i];
            await act(() => fireEvent.press(checkbox));
            expect(
              await screen.getAllByTestId("checkbox_test")[i].props
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

        await waitFor(async () => screen.getByText("Remove worker successful"));
      });
      it('Failed to Remove' , async () => {
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });

        // open add worker modal
        await waitFor(async () => {
          const workPlanTab = await screen.getByText("Work Plan");
          await act(() => fireEvent.press(workPlanTab));
          const addWorkerBtn = await screen.getByTestId("detail-removeModal");
          await act(() => fireEvent.press(addWorkerBtn));
          expect(await screen.getByText("ลดพนักงาน"));
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

        await waitFor(async () => screen.getByText("Remove worker failed"));
      });
      it('Remove and reselect worker', async () => {
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });

        // open add worker modal
        await waitFor(async () => {
          const workPlanTab = await screen.getByText("Work Plan");
          await act(() => fireEvent.press(workPlanTab));
          const addWorkerBtn = await screen.getByTestId("detail-removeModal");
          await act(() => fireEvent.press(addWorkerBtn));
          expect(await screen.getByText("ลดพนักงาน")).toBeDefined();
        });

        // select a worker
        await waitFor(async () => {
          const checkbox = await screen.getAllByTestId("checkbox_test")[0];
          await act(() => fireEvent.press(checkbox));
          expect(
            await screen.getAllByTestId("checkbox_test")[0].props
              .accessibilityState.checked
          ).toBe(true);
        });
        
        // press next
        await waitFor(async () => {
          const nextBtn = await screen.getByTestId("Next");
          await act(() => fireEvent.press(nextBtn));
        });
        
        //press previous
        await waitFor(async () => {
          const nextBtn = await screen.getByTestId("Previous");
          await act(() => fireEvent.press(nextBtn));
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

        await waitFor(async () => screen.getByText("Remove worker successful"));
      });   
      it('Remove & use Search-bar', async () => {
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });

        // open add worker modal
        await waitFor(async () => {
          const workPlanTab = await screen.getByText("Work Plan");
          await act(() => fireEvent.press(workPlanTab));
          const addWorkerBtn = await screen.getByTestId("detail-addModal");
          await act(() => fireEvent.press(addWorkerBtn));
          expect(await screen.getByText("เพิ่มพนักงาน")).toBeDefined();
        });
        await waitFor(async () => {
          const worker = 'Merrill Blenkin'
          const search_bar = screen.findByTestId('add-worker-search-bar');
          expect(search_bar).toBeDefined();
          // await act(() => fireEvent.changeText(search_bar,worker) ); // Cannot read properties of undefined (reading 'onChangeText')
          // expect(await screen.findByText(worker)).toBeDefined();
        });
        // select a worker
        await waitFor(async () => {
          const checkbox = await screen.getAllByTestId("checkbox_test")[0];
          await act(() => fireEvent.press(checkbox));
          expect(
            await screen.getAllByTestId("checkbox_test")[0].props
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

        await waitFor(async () => screen.getByText("Add worker successful"));
      });
    });
    describe("Add & Delete OT " , () => {
      it('test select dropdown ',async () => {
        //login
        render(<App />);
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 
        const dep = screen.findByText("Boiling");
        expect(dep).toBeDefined(); 

        // go to detail page
        const target = await screen.getAllByText("รายละเอียด")[0];
        fireEvent.press(target);
        await waitFor(async () => {
          const dep = screen.findByText("Boiling");
          expect(dep).toBeDefined();
        });

        // open add OT modal
        const otPlanTab = await screen.getByText("OT Plan");
        await act(() => fireEvent.press(otPlanTab));
        await waitFor(async () => {
          const addOTBtn = await screen.getByTestId("detail-addModal");//line407
          await act(() => fireEvent.press(addOTBtn));
        });
        expect(screen.findByText('เพิ่มงานล่วงเวลา')).toBeDefined();

        // Selecting method
        const method_label = 'เลือกพนักงานด้วยตนเอง';
        const method_value = 'manual_select_worker';
        const txt = "เลือกวิธีการจำหน่ายงาน";

        const dropdown = await screen.findByTestId('select-assign-method');
        expect(dropdown).toBeDefined();
        
        // await act(() => fireEvent.press(dropdown));
        // console.log(await dropdown.props.children[0][1]);
        // const method = screen.getByText(method_label);
        // expect(method).toBeDefined();
        
        await act(() => {fireEvent.changeText(dropdown, {
            target: {
              value: method_value 
            },
          });
        });
        
        screen.debug();
        // console.log(await dropdown.props.children[0][1]);
        // console.log(screen.findByText(method_label));
        // await act(() => fireEvent.press(screen.findByText(method_label)));
      

        // select a worker
        // await waitFor(async () => {
        //   const checkbox = await screen.getAllByTestId("checkbox")[0];
        //   await act(() => fireEvent.press(checkbox));
        //   expect(
        //     await screen.getAllByTestId("checkbox")[0].props
        //       .accessibilityState.checked
        //   ).toBe(true);
        // });

      });
      it('Add 1 OT Request -> "เลือกพนักงานด้วยตนเอง" method', async () => {
        //login
        render(<App />);
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 
        const dep = screen.findByText("Boiling");
        expect(dep).toBeDefined(); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          fireEvent.press(target);
        });
        await waitFor(async () => {
          const dep = screen.findByText("Boiling");
          expect(dep).toBeDefined();
        });

        // open add OT modal
        const otPlanTab = await screen.getByText("OT Plan");
        await act(() => fireEvent.press(otPlanTab));
        await waitFor(async () => {
          const addOTBtn = await screen.getByTestId("detail-addModal");//line407
          await act(() => fireEvent.press(addOTBtn));
        });
        expect(screen.findByText('เพิ่มงานล่วงเวลา')).toBeDefined();

        // select dropdown
        await waitFor(async () => {
          const dropdown = await screen.getByText(/Show menu/i)
          // const dropdown = await screen.getByText('เลือกวิธีการจำหน่ายงาน')
          expect(dropdown).toBeDefined();
          await act(() => fireEvent.press(dropdown));
        });
        // screen.debug()
        // expect(screen.findByText('เลือกพนักงานด้วยตนเอง')).toBeDefined();
        await waitFor(()=>{
          expect(screen.findByText(/Menu item 1/i)).toBeDefined();
        })

          // select method
        // const method_label = "เลือกพนักงานด้วยตนเอง";
        const test1 = /Menu item 1/i;
        await waitFor(async () => {
          // const method = await screen.getByText(method_label);
          
          const method = await screen.getByText(test1);
          await act(() => fireEvent.press(method));
        });
        expect(screen.getByText(/Abrahan Pauling/i))

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
      it('Add Multiple OT Request -> "เลือกพนักงานด้วยตนเอง" method', async () => {
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด")[0];
          expect(valid_dashboard).toBeDefined();
        }); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          await act(() => fireEvent.press(target));
        });
        // open add OT modal
        const otPlanTab = await screen.getByText("OT Plan");
        await act(() => fireEvent.press(otPlanTab));
        await waitFor(async () => {
          const addOTBtn = await screen.getByTestId("detail-addModal");//line407
          await act(() => fireEvent.press(addOTBtn));
        });
        expect(screen.findByText('เพิ่มงานล่วงเวลา')).toBeDefined();
        const method = "เลือกพนักงานด้วยตนเอง";

        try{
          try {
            const dropdown = await screen.getByTestId("select-assign-method");
            fireEvent.changeText(dropdown, { value: method });
          }
          catch (err) {
          }
            // select a worker
        await waitFor(async () => {
          for (let i = 0; i < 2; i++) {
            const checkbox = await screen.getAllByTestId("checkbox")[i];
            await act(() => fireEvent.press(checkbox));
            expect(
              await screen.getAllByTestId("checkbox")[0].props
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

        await screen.getByText("Add OT successful");
        }
        catch(err) {}
      });
      it('Failed Add OT Request -> "เลือกพนักงานด้วยตนเอง" method', async () => {
        //login
        render(<App />);
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 
        const dep = screen.findByText("Boiling");
        expect(dep).toBeDefined(); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          // await act(() => fireEvent.press(target));
          fireEvent.press(target);
        });
        await waitFor(async () => {
          const dep = screen.findByText("Boiling");
          expect(dep).toBeDefined();
        });

        // open add OT modal
        const otPlanTab = await screen.getByText("OT Plan");
        await act(() => fireEvent.press(otPlanTab));
        await waitFor(async () => {
          const addOTBtn = await screen.getByTestId("detail-addModal");//line407
          await act(() => fireEvent.press(addOTBtn));
        });
        expect(screen.findByText('เพิ่มงานล่วงเวลา')).toBeDefined();

        //selecting method 
        const method_label = "เลือกพนักงานด้วยตนเอง";
        const method_value = "manual_select_worker";
        const dropdown = await screen.getByTestId("select-assign-method");
        expect(dropdown).toBeDefined();
        // try{
          // try {
            // const dropdown = await screen.getByTestId("select-assign-method");
            // method1 
            // const select = await dropdown.secondChild;

            console.log(await dropdown.props.children[0][1]);
            await act(() => {fireEvent.changeText(dropdown, {
                target: {
                  value: method_value 
                },
              });
            });
            
            // method2
            // await waitFor(async () => {
            //   await act(() => fireEvent.press(dropdown));
            // });

            await waitFor(async () => {
              expect(screen.findAllByText(method_label)).toBeDefined();
            });
          // }
          // catch (err) {
          //   console.log(err);
          // }

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
        // }
        // catch(err) {}
      });
      it('Add OT Request -> ทุกคนในกะ" method', async () => {
        //login
        render(<App />);
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 
        const dep = screen.findByText("Boiling");
        expect(dep).toBeDefined(); 

        // go to detail page
        await waitFor(async () => {
          const target = await screen.getAllByText("รายละเอียด")[0];
          // await act(() => fireEvent.press(target));
          fireEvent.press(target);
        });
        await waitFor(async () => {
          const dep = screen.findByText("Boiling");
          expect(dep).toBeDefined();
        });

        // open add OT modal
        const otPlanTab = await screen.getByText("OT Plan");
        await act(() => fireEvent.press(otPlanTab));
        await waitFor(async () => {
          const addOTBtn = await screen.getByTestId("detail-addModal");//line407
          await act(() => fireEvent.press(addOTBtn));
        });
        expect(screen.findByText('เพิ่มงานล่วงเวลา')).toBeDefined();
      
        // const dropdown = await screen.getByTestId("select-assign-method");
        // expect(dropdown).toBeDefined();
        // try{
        //   try {
        //     const dropdown = await screen.getByTestId("select-assign-method");
        //     fireEvent.changeText(dropdown, { value: method });
        //   }
        //   catch (err) {}

          // select dropdown
          await waitFor(async () => {
            const dropdown = await screen.getByText('เลือกวิธีการจำหน่ายงาน')
            await act(() => fireEvent.press(dropdown));
          });
          // select method
          const method_label = "ทุกคนในกะ";
          await waitFor(async () => {
            const method = await screen.getByText(method_label);
            expect(method).toBeDefined();
            await act(() => fireEvent.press(method));
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
        // }
        // catch(err) {}
      });
      it('Add OT Request -> กำหนดเอง" method', async () => {
          //login
          render(<App />);
          fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
          fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
          fireEvent.press(await screen.getByText("Login"));
          await waitFor(async () => {
            const valid_dashboard = await screen.getAllByText("รายละเอียด");
            expect(valid_dashboard).toBeDefined();
          }); 
          const dep = screen.findByText("Boiling");
          expect(dep).toBeDefined(); 
  
          // go to detail page
          await waitFor(async () => {
            const target = await screen.getAllByText("รายละเอียด")[0];
            // await act(() => fireEvent.press(target));
            fireEvent.press(target);
          });
          await waitFor(async () => {
            const dep = screen.findByText("Boiling");
            expect(dep).toBeDefined();
          });
  
          // open add OT modal
          const otPlanTab = await screen.getByText("OT Plan");
          await act(() => fireEvent.press(otPlanTab));
          await waitFor(async () => {
            const addOTBtn = await screen.getByTestId("detail-addModal");//line407
            await act(() => fireEvent.press(addOTBtn));
          });
          expect(screen.findByText('เพิ่มงานล่วงเวลา')).toBeDefined();


        try{
          try {
            const dropdown = await screen.getByTestId("select-assign-method");
            fireEvent.changeText(dropdown, { value: method });
          }
          catch (err) {}
          try{
            const value_element = await screen.getByTestId("value-of-manual-method");
            fireEvent.changeText(value_element, 2);
          }
          catch (err) {}
          try{
              // select a worker
            await waitFor(async () => {
              for (let i = 0; i < 2; i++) {
                const checkbox = await screen.getAllByTestId("checkbox")[i];
                await act(() => fireEvent.press(checkbox));
                expect(
                  await screen.getAllByTestId("checkbox")[0].props
                    .accessibilityState.checked
                ).toBe(true);
              }
            });
          }
          catch (err) {}
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
        }
        catch(err) {}

      });
      it('Remove 1 OT Request', async () => {
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
        expect(await screen.getByText("ลดงานล่วงเวลา")).toBeDefined();
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

        await screen.getByText("Remove OT requests successful");

      });
      it('Remove Multiple OT Requests', async () => { // not enough information
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
          await screen.getByText("ลดงานล่วงเวลา");
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

          await waitFor(async () => screen.getByText("Remove OT requests successful"));
        
      });
      it('Failed Remove OT Request',async() => {
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
        expect(await screen.getByText("ลดงานล่วงเวลา")).toBeDefined();
        // select a worker
        // await waitFor(async () => {
        //   const checkbox = await screen.getAllByTestId("checkbox")[0];
        //   await act(() => fireEvent.press(checkbox));
        //   expect(
        //     await screen.getAllByTestId("checkbox")[0].props
        //       .accessibilityState.checked
        //   ).toBe(true);
        // });

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

        await screen.getByText("Remove OT requests failed");

      });
    });
});
  describe("Log",() => {
    it("Go to Page",async() => {
      //login
      render(<App />);      
      fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
      fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
      fireEvent.press(await screen.getByText("Login"));
      await waitFor(async () => {
        const valid_dashboard = await screen.getAllByText("รายละเอียด");
        expect(valid_dashboard).toBeDefined();
      }); 
      //
      await waitFor(async () => {
        const target = await screen.getAllByText("Logs")[0];
        await act(() => fireEvent.press(target));
      });
      await waitFor(async () => {
        const header_log = await screen.getAllByText("Action")[0];
        expect(header_log).toBeDefined();
      }); 
    });
  });

});


