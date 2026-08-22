import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import SubjectTable from "../Components/SubjectTable";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";

const CreateSubject = () => {
  const [formData, setFormData] = useState({
    subject: "",
    date: "",
    id: "",
  });

  // Initialize state with an empty array to prevent iterable errors
  const [tabData, setTabData] = useState([]);

  const handleClear = () => {
    setFormData({
      subject: "",
      date: "",
      id: "",
    });
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL_GET + "/allsubject")
      .then((res) => res.json())
      .then((dataX) => {
        // Ensure the fetched data is an array before setting state
        if (Array.isArray(dataX)) {
          setTabData(dataX);
        }
      });
  }, []);

  const handleFormEdit = (val) => {
    console.log(val);
    setFormData(val);
  };

  // Corrected typo from handleSubmimt to handleSubmit
  const handleSubmit = async () => {
    if (formData.id) {
      const allData = tabData.map((row) => {
        if (row.id === formData.id) {
          return formData;
        } else return row;
      });

      setTabData(allData);

      const response = await fetch(
        process.env.REACT_APP_BASE_URL_POST + "/updatesubject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      await handleClear();
      return response.json();
    } else {
      const idIn = Math.floor(Math.random() * 100 + 1);
      // Now this will work because tabData is always an array
      setTabData([...tabData, { ...formData, id: idIn }]);

      const response = await fetch(
        process.env.REACT_APP_BASE_URL_POST + "/newsubject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      await handleClear();
      return response.json();
    }
  };

  const handleTextChange = (event) => {
    const { value } = event.target;
    const d = new Date();
    const dateIn = d.toLocaleDateString();

    setFormData({
      ...formData,
      subject: value,
      date: dateIn,
    });
  };

  const handleDelete = async () => {
    const response = await fetch(
      process.env.REACT_APP_BASE_URL_POST + "/delsubject",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    console.log(response);

    const alltasks = tabData.filter((row) => row.id !== formData.id);
    setTabData(alltasks);

    await handleClear();

    return response.json();
  };

  return (
    <div>
      <Grid
        container
        spacing={5}
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: "5rem" }}
      >
        <Grid item md={12} sm={12}>
          <TextField
            id="subject"
            label="Subject"
            variant="outlined"
            onChange={handleTextChange}
            value={formData.subject}
          />
        </Grid>

        <Grid item md={2} sm={12}>
          {/* Corrected onClick handler */}
          <Button variant="contained" onClick={handleSubmit}>
            {formData.id ? "Update" : "Add"}
          </Button>
        </Grid>

        <Grid
          item
          md={2}
          sm={12}
          sx={{ display: formData.id ? "inline" : "none" }}
        >
          <Button variant="contained" onClick={handleDelete} disabled={false}>
            Delete
          </Button>
        </Grid>

        <Grid
          item
          md={2}
          sm={12}
          sx={{ display: formData.id ? "inline" : "none" }}
        >
          <Button variant="contained" onClick={handleClear} disabled={false}>
            Clear
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={5}
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: "5rem" }}
      >
        {/* Render table only if there is data */}
        {tabData && tabData.length > 0 && (
          <Grid item md={10} xs={12}>
            <SubjectTable handleEdit={handleFormEdit} data={tabData} />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default CreateSubject;