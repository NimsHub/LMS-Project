import React, { useEffect } from "react";
import {
  Typography,
  Fade,
  Grid,
  Container,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Course from "./Course";
import { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import CourseView from "./CourseView";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import data from "./data.json";
import { useSelector, useDispatch } from "react-redux";
import { coursesReceived } from "./../../store/courses.js";

const useStyles = makeStyles({
  container: {
    display: "flex",
    background: "whitesmoke",
    height: "100vh",
    overflow: "hidden",
    overflowY: "scroll",
  },
});
const Courses = () => {
  const dispatch = useDispatch();

  const abc = useSelector(coursesReceived);
  console.log(abc.payload.courses);

  const [courses, setCourses] = useState(abc.payload.courses);

  useEffect(() => {
    setCourses(abc.payload.courses);
  }, [abc.payload.courses]);

  const [Search, setSearch] = useState("");
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Fade in>
        <div style={{ marginTop: "80px", padding: "15px", width: "100vw" }}>
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "20px 0 20px 15px",
              padding: 0,
            }}
          >
            <Typography variant="h4">My Courses</Typography>
            <TextField
              size="small"
              style={{ width: "40%" }}
              color="inherit"
              variant="outlined"
              label="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Container>
          <Grid container spacing={5} justifyContent="flex-start">
            {courses
              .filter((val) => {
                if (Search === "") return val;
                else if (
                  val.courseName.toLowerCase().includes(Search.toLowerCase())
                )
                  return val;
              })
              .map((course) => {
                return (
                  <Grid item sm={6} md={4} lg={3}>
                    <Link
                      to="/dashboard/my-courses/course-view"
                      style={{ textDecoration: "none" }}
                    >
                      <Course
                        courseName={course.courseName}
                        courseCode={course.courseCode}
                        info={course.info}
                      />
                    </Link>
                  </Grid>
                );
              })}
          </Grid>
        </div>
      </Fade>
    </Container>
  );
};
const MyCourses = () => {
  const classes = useStyles();

  return (
    <Router>
      <Switch>
        <Route exact path="/dashboard/my-courses" component={Courses} />
        <Route
          exact
          path="/dashboard/my-courses/course-view"
          component={CourseView}
        />
      </Switch>
    </Router>
  );
};

export default MyCourses;
