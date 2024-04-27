import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import WorkerApi from "@/api/nexus";
import { useNavigateWithParams } from "@/hooks";

export default function WorkerCreate() {
  const { goToWorker } = useNavigateWithParams();
  const formData = {
    band_width_level_id: 0,
    band_width_level_name: "Low Speed",
    brand_icon:
      "https://mxtfdkppxyflmmglullf.supabase.co/storage/v1/object/public/icons/nvidia.svg?t=2023-09-05T21%3A52%3A29.736Z",
    brand_name: "NVIDIA",
    device_type: "GPU",
    download_speed_mbps: 0.0,
    hardware_id: 0,
    hardware_name: "GeForce RTX 3050",
    hardware_quantity: 1,
    is_activate: true,
    is_working: false,
    iso2: "HK",
    location_id: 0,
    location_name: "Hong Kong",
    operating_system: "Windows",
    status: "up",
    upload_speed_mbps: 0.0,
  };

  const LOCATIONS = [
    { value: "alabama", label: "Alabama" },
    { value: "newYork", label: "New York" },
    { value: "sanFrancisco", label: "San Francisco" },
    { value: "losAngeles", label: "Los Angeles" },
  ];

  const OPERATION_SYSTEMS = [
    { value: "mac", label: "Mac OS" },
    { value: "windows", label: "Windows" },
    { value: "linux", label: "Linux" },
    { value: "unix", label: "Unix" },
    { value: "other", label: "Others" },
  ];

  const handleFormSubmit = async (event) => {
    console.log("Create a new device and the form data: ", formData);
    //const { id: userId } = Auth.getProfile();

    try {
      const resp = await WorkerApi.nodeCreate(formData);
      console.log("the resp: ", resp);

      if (resp && resp.code === 200 && resp.success) {
        console.log("Success: Create a new device!", resp);
        goToWorker();
      } else {
        console.log("Error: Can not get the work list data!");
      }
    } catch (e) {
      console.log("Exception: Failure to load the worker list data!", e);
    }
  };

  return (
    <Container maxWidth="xl">
      <Card>
        <CardHeader
          subheader="Manage the notifications"
          title="Add a New Device"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={12} xs={12}>
              <Typography variant="h2" gutterBottom></Typography>
            </Grid>
            <Grid md={6} xs={12}>
              <Typography variant="h6" gutterBottom>
                1. Name It
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Add name for your device, You'll find the advanced configuration
                below, in the advanced setting section
              </Typography>
            </Grid>
            <Grid md={6} xs={12}>
              <Card>
                <CardContent>
                  <FormControl fullWidth>
                    <InputLabel>Name</InputLabel>
                    <OutlinedInput
                      defaultValue={formData.hardware_name}
                      label="Name"
                      name="name"
                      onChange={(event) => {
                        formData.hardware_name = event.target.value;
                      }}
                    />
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>

            <Grid md={6} xs={12}>
              <Typography variant="h6" gutterBottom>
                2. Location
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Choose your location
              </Typography>
            </Grid>
            <Grid md={6} xs={12}>
              <Card>
                <CardContent>
                  <FormControl fullWidth>
                    <InputLabel>Location</InputLabel>
                    <Select
                      defaultValue="newYork"
                      label="Location"
                      name="location"
                      variant="outlined"
                      onChange={(event) => {
                        formData.location_name = event.target.value;
                      }}
                    >
                      {LOCATIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>

            <Grid md={6} xs={12}>
              <Typography variant="h6" gutterBottom>
                3. Choose Operating System "OS"
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Choose your operating system from the drop down list
              </Typography>
            </Grid>
            <Grid md={6} xs={12}>
              <Card>
                <CardContent>
                  <FormControl fullWidth>
                    <InputLabel>Operating System</InputLabel>

                    <Select
                      defaultValue="mac"
                      label="Operating System"
                      name="operating_system"
                      variant="outlined"
                      onChange={(event) => {
                        formData.operating_system = event.target.value;
                      }}
                    >
                      {OPERATION_SYSTEMS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>

            <Grid md={6} xs={12}>
              <Typography variant="h6" gutterBottom>
                4. Device Type
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                If you choose GPU worker and your device doesn't have GPU the
                setup will fail
              </Typography>
            </Grid>
            <Grid md={6} xs={12}>
              <Card>
                <CardContent>
                  <FormControl fullWidth>
                    <FormControl fullWidth>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Device Type
                      </FormLabel>
                      <RadioGroup
                        defaultValue={formData.device_type}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={(event) => {
                          formData.device_type = event.target.value;
                        }}
                      >
                        <FormControlLabel
                          value="GPU"
                          control={<Radio />}
                          label="GPU Worker"
                        />
                        <FormControlLabel
                          value="CPU"
                          control={<Radio />}
                          label="CPU Worker"
                        />
                      </RadioGroup>
                    </FormControl>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>

            <Grid md={6} xs={12}>
              <Typography variant="h6" gutterBottom>
                5. Download script file to install drivers
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Download script file to install drivers
              </Typography>
            </Grid>
            <Grid md={6} xs={12}>
              <Card>
                <CardContent>
                  <FormControl fullWidth>
                    <InputLabel>
                      Download script file to install drivers
                    </InputLabel>
                    <OutlinedInput
                      defaultValue="script_file"
                      label="Script File"
                      name="script_file"
                    />
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>

            <Grid md={6} xs={12}>
              <Typography variant="h6" gutterBottom>
                6. Run Docker Command
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Run the following docker command
              </Typography>
            </Grid>
            <Grid md={6} xs={12}>
              <Card>
                <CardContent>
                  <FormControl fullWidth>
                    <InputLabel>Copy the below command into Docker</InputLabel>
                    <OutlinedInput
                      defaultValue="docker_command"
                      label="Docker Command"
                      name="docker_command"
                    />
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>

            <Divider />
            <Grid md={6} xs={12}></Grid>
            <Grid md={6} xs={12}>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={handleFormSubmit}>
                  Save changes
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
