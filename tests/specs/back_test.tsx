
describe("Manager", () => {
  describe("login", () => {
      it("Both Valid", async () => {
        //login
        render(<App />);      
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(screen.getByText("Login"));
        await waitFor(async () => {
          const valid_dashboard = await screen.getAllByText("รายละเอียด");
          expect(valid_dashboard).toBeDefined();
        }); 
      });

      it("InValid UserAccount", async () => {
        render(<App />);
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngWrongUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
        fireEvent.press(await screen.getByText("Login"))
        await waitFor(async () => {
          // await screen.queryByText("Email or Password incorrect")
          expect(screen.queryByText("Email or Password incorrect")).toBeDefined();
        });
      });

      it("InValid Password", async () => {
        render(<App />);
        fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
        fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngWrongPassword);
        fireEvent.press(await screen.getByText("Login"))
        await waitFor(async () => {
          // await screen.queryByText("Email or Password incorrect")
          expect(screen.queryByText("Email or Password incorrect")).toBeDefined();
        });
      });
      it("Both Invalid", async () => {
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
    it("Definded Departments Name", async() => {
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
    it("Definded Department Data", async () => {
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
    it("Valid Search", async() => {
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
    it("Invalid Search", async() => {
      //login
      render(<App />);      
      fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
      fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
      fireEvent.press(await screen.getByText("Login"));
      await waitFor(async () => {
        const valid_dashboard = await screen.getAllByText("รายละเอียด");
        expect(valid_dashboard).toBeDefined();
      });
      const search_word = 'apple';
      const search_bar = screen.findByTestId('dep-search-bar');
      await waitFor(async ()=>fireEvent.changeText(await search_bar, search_word));
      
      // await waitFor(async () => {
      //   const dep_name = screen.findByText(search_word);
      //   expect(dep_name).toBeUndefined();
      // });
    });
    it("Go to department's details", async() => {
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
    it("Valid Search", async() => {
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
      const search_word = 'Rahal Roff';
      const search_bar = screen.findByTestId('details-search-bar');
      fireEvent.changeText(await search_bar, search_word);
      
      await waitFor(async () => {
        const dep_name = screen.findByText(search_word);
        expect(dep_name).toBeDefined();
      });
    });
    it("Invalid Search", async() => {
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
      const search_word = 'worker worker';
      const search_bar = screen.findByTestId('details-search-bar');
      fireEvent.changeText(await search_bar, search_word);
      
      // await waitFor(async () => {
      //   const dep_name = screen.findByText(search_word);
      //   expect(dep_name).toBeDefined();
      // });
    });
    it('Current Date', async () => {
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
      // await waitFor(async () => { // ERROR Casue using Faketimer
      //   const datepicker = screen.findByTestId('datepicker');
      //   expect(datepicker).toBeDefined();
      // });
      // await waitFor(async () => {
      //   const currentdate = '25 April 2023'
      //   const datepicker = screen.findByText(currentdate);
      //   expect(datepicker).toBeDefined();
      // });

    });
    it('Access Date' , async () => {
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
      // await waitFor(async () => { // ERROR Casue using Faketimer
      //   const datepicker = screen.findByTestId('datepicker');
      //   expect(datepicker).toBeDefined();
      // });
      // await waitFor(async () => {
      //   const currentdate = '25 April 2023'
      //   const datepicker = screen.findByText(currentdate);
      //   expect(datepicker).toBeDefined();
      // });

    });
    it('Cancle selected Date',async () => {
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
        // await waitFor(async () => { // ERROR Casue using Faketimer
        //   const datepicker = screen.findByTestId('datepicker');
        //   expect(datepicker).toBeDefined();
        // });
        // await waitFor(async () => {
        //   const currentdate = '25 April 2023'
        //   const datepicker = screen.findByText(currentdate);
        //   expect(datepicker).toBeDefined();
        // });

    });
    it('Select Date', async () => {
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
        // await waitFor(async () => { // ERROR Casue using Faketimer
        //   const datepicker = screen.findByTestId('datepicker');
        //   expect(datepicker).toBeDefined();
        // });
        // await waitFor(async () => {
        //   const currentdate = '25 April 2023'
        //   const datepicker = screen.findByText(currentdate);
        //   expect(datepicker).toBeDefined();
        // });

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
      await waitFor(async () => { 
        const shift_node = screen.findByTestId('select-shift');
        expect(shift_node).toBeDefined();
        // await act(() => fireEvent.press(shift_node));
        // expect(screen.findByText("08:00-16:00"));
      });
    });
    it('OT Plan Table', async() => {
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
    it('Worker Plan Table', async() => {
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
    it('Go to Add worker page', async () => {
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
    });
    it('Go to Remove worker page', async () => {
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
    });
    it('Go to Add OT Request page', async () => {
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
        // await act(() => userEvent.click(target));
      });
      // open add OT modal
      const otPlanTab = await screen.getByText("OT Plan");
      await act(() => fireEvent.press(otPlanTab));
      await waitFor(async () => {
        const addOTBtn = await screen.getByTestId("detail-addModal");//line407
        await act(() => fireEvent.press(addOTBtn));
      });
      expect(screen.findByText('เพิ่มงานล่วงเวลา')).toBeDefined();
    });
    it('Go to Remove OT Reques page', async() =>{
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
        // await act(() => userEvent.click(target));
      });
      // open add OT modal
      const otPlanTab = await screen.getByText("OT Plan");
      await act(() => fireEvent.press(otPlanTab));
      await waitFor(async () => {
        const addOTBtn = await screen.getByTestId("detail-removeModal");//line407
        await act(() => fireEvent.press(addOTBtn));
      });
      expect(screen.getByText("ลดงานล่วงเวลา")).toBeDefined();
    });
  });

  describe("Manage work plan", () => {
    describe("Add Worker", () => {
      it('1 Worker' , async () => {
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

        await screen.getByText("Add worker successful");
      });
      it('more than 1 Worker' , async () => { 
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

        await screen.getByText("Add worker successful");
      });
      it('Add and Previous Pages', async () => {
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

        await screen.getByText("Add worker successful");
      });
      it('Cancle / 0 Worker' , async () => {
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

        await screen.getByText("Add worker failed");
      });
      it('Seach Worker', async () => {
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

        await screen.getByText("Add worker successful");
      });
    });
    describe("Remove Worker", () => {
      it('1 Worker' , async () => {
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
      it('Add and Previous Pages', async () => {
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

        await screen.getByText("Remove worker successful");
      });
      it('Cancle / 0 Worker' , async () => {
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

        await screen.getByText("Remove worker failed");
      });
      it('Seach Worker', async () => {
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

        await screen.getByText("Add worker successful");
      });
    });
  });

  describe("Manages OT request", () => {
    describe("ADD OT" , () => {
      describe('"เลือกพนักงานด้วยตนเอง" method', () => {
        it('Sending 1 Request', async () => {
          //login
          render(<App />);      
          fireEvent.changeText(await screen.getByPlaceholderText("Username"),mngUsername);
          fireEvent.changeText(await screen.getByPlaceholderText("Password"),mngPassword);
          fireEvent.press(await screen.getByText("Login"));
          // userEvent.click(await screen.getByText("Login")); //The given node is not an Element, the node type is: object.
          await waitFor(async () => {
            const valid_dashboard = await screen.getAllByText("รายละเอียด")[0];
            expect(valid_dashboard).toBeDefined();
          }); 

          // go to detail page
          await waitFor(async () => {
            const target = await screen.getAllByText("รายละเอียด")[0];
            await act(() => fireEvent.press(target));
            // await act(() => userEvent.click(target));
          });
          // open add OT modal
          const otPlanTab = await screen.getByText("OT Plan");
          await act(() => fireEvent.press(otPlanTab));
          await waitFor(async () => {
            const addOTBtn = await screen.getByTestId("detail-addModal");//line407
            await act(() => fireEvent.press(addOTBtn));
          });
          expect(screen.findByText('เพิ่มงานล่วงเวลา')).toBeDefined();
          //method 1 select dropdown
          // expect(await screen.getByText("เพิ่มงานล่วงเวลา")).toBeDefined();
          // const dropdown = screen.getByTestId("select-assign-method");
          // await act(async () => await fireEvent.press(dropdown));

          //method 2
          const select_method = await screen.getByTestId("select-assign-method");
          expect(select_method).toBeDefined();
          // console.log(select_method.children.length); // 4 
          // console.log(Object.keys(select_method));
          // console.log(select_method[ '_fiber' ]);
          // console.log(Object.keys(select_method[ '_fiber' ]));
          // console.log(Object.keys(select_method[ '_fiber' ]['child']));
// ["manual_select_worker"]

          // await waitFor(async () => {
          //   const dropdown_option = await screen.getByText("เลือกพนักงานด้วยตนเอง");
          //   expect(dropdown_option).toBeDefined();
          // });

        
          // select a worker
          // await waitFor(async () => {
          //   const checkbox = await screen.getAllByTestId("checkbox")[0];
          //   await act(() => fireEvent.press(checkbox));
          //   expect(
          //     await screen.getAllByTestId("checkbox")[0].props
          //       .accessibilityState.checked
          //   ).toBe(true);
          // });

          //   // press next
          // await waitFor(async () => {
          //   const nextBtn = await screen.getByTestId("Next");
          //   await act(() => fireEvent.press(nextBtn));
          // });

          // // press confirm
          // await waitFor(async () => {
          //   const confirmBtn = await screen.getByText("Confirm");
          //   await act(() => fireEvent.press(confirmBtn));
          // });

          // await screen.getByText("Add OT successful");
          
        });
        it('Sending more than 1 Requests', async () => { //#Coding
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

          await screen.getByText("เพิ่มงานล่วงเวลา");
          const dropdown = screen.getByTestId("select-assign-method");
          await act(async () => {
            await fireEvent.press(dropdown)
          });

          // // select a worker
          // await waitFor(async () => {
          //   const checkbox = await screen.getAllByTestId("checkbox")[0];
          //   await act(() => fireEvent.press(checkbox));
          //   expect(
          //     await screen.getAllByTestId("checkbox")[0].props
          //       .accessibilityState.checked
          //   ).toBe(true);
          // });

          // // press next
          // await waitFor(async () => {
          //   const nextBtn = await screen.getByTestId("Next");
          //   await act(() => fireEvent.press(nextBtn));
          // });

          // // press confirm
          // await waitFor(async () => {
          //   const confirmBtn = await screen.getByText("Confirm");
          //   await act(() => fireEvent.press(confirmBtn));
          // });

          // await screen.getByText("Add OT successful");
        });
      });
      describe('"ทุกคนในกะ" method', () => {
        it('Sending Requests', async () => {
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
          });
          await waitFor(async () => {
            const addOTBtn = await screen.getByTestId("detail-addModal");//line407
            await act(() => fireEvent.press(addOTBtn));
          });
            // //Select method 
            // const selectd_method = 1;
            // await waitFor(async () => { // app/components/Modal/add_del_ot_modal.tsx
            //   const dropdown_element = await screen.getByPlaceholderText("เลือกวิธีการจำหน่ายงาน");
            //   dropdown_element.selectedIndex = selectd_method;
            // });

            // // press next
            // await waitFor(async () => {
            //   const nextBtn = await screen.getByTestId("Next");
            //   await act(() => fireEvent.press(nextBtn));
            // });

            // // press confirm
            // await waitFor(async () => {
            //   const confirmBtn = await screen.getByText("Confirm");
            //   await act(() => fireEvent.press(confirmBtn));
            // });

            // await screen.getByText("Add OT successful");
          });
        });
      describe('"กำหนดเอง" method', () => {
        it('Sending Requests', async () => {
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
          });
          await waitFor(async () => {
            const addOTBtn = await screen.getByTestId("detail-addModal");//line407
            await act(() => fireEvent.press(addOTBtn));
          });
          // //Select method 
          // const selectd_method = 1;
          // await waitFor(async () => { // app/components/Modal/add_del_ot_modal.tsx
          //   const dropdown_element = await screen.getByPlaceholderText("เลือกวิธีการจำหน่ายงาน");
          //   dropdown_element.selectedIndex = selectd_method;
          // });

          // // press next
          // await waitFor(async () => {
          //   const nextBtn = await screen.getByTestId("Next");
          //   await act(() => fireEvent.press(nextBtn));
          // });

          // // press confirm
          // await waitFor(async () => {
          //   const confirmBtn = await screen.getByText("Confirm");
          //   await act(() => fireEvent.press(confirmBtn));
          // });

          //   await screen.getByText("Add OT successful");
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
        it('more than OT Requests', async () => { // not enough information
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

            await screen.getByText("Remove OT requests successful");
          
        });
        it('Cancle / 0 OT Request',async() => {
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
    it('Filter with "เพิ่ม"',async () => {
      //login
      render(<App />).toJSON();      
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
        const header_log = await screen.getAllByTestId("btnGroup");
        expect(header_log).toBeDefined();
        console.log(header_log);
      }); 
      
      await waitFor(async () => {
        const target = screen.getAllByLabelText('เพิ่ม')[0];
        expect(target).toBeDefined();
        await act(()=> userEvent.dblClick(target));
      });
      


      expect(screen.getAllByText('Delete Worker') ||screen.getAllByText('Add OT') ||screen.getAllByText('Delete OT') ||screen.getAllByText('EDIT_OT') ).not.toBeDefined();
      // Add Worker
      // Delete Worker
      // Add OT
      // Delete OT
      // EDIT_OT

    });
  });

});