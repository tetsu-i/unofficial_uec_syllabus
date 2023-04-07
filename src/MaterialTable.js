import React, { useState, useMemo, useEffect, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const MaterialTable = ({ initialData }) => {
  const [semesterFilter, setSemesterFilter] = useState({
    firstSemester: true,
    secondSemester: true,
  });
  const [timeFilter, setTimeFilter] = useState(null);
  const [dayFilter, setDayFilter] = useState(null);

  const timeOptions = [1, 2, 3, 4, 5, 6, 7];
  const dayOptions = ["月", "火", "水", "木", "金", "土"];

  const [filteredData, setFilteredData] = useState(
    initialData.map((row) => ({
      ...row,
      id: row["No."],
    }))
  );

  const applyFilters = useCallback(() => {
    setFilteredData(
      initialData
        .map((row) => ({ ...row, id: row["No."] }))
        .filter((row) => {
          if (semesterFilter.firstSemester && row["学期"] === "前学期") {
            return true;
          }
          if (semesterFilter.secondSemester && row["学期"] === "後学期") {
            return true;
          }
          return false;
        })
        .filter((row) => {
          if (timeFilter === null) {
            return true;
          }
          if (row["曜日・時限"].includes(timeFilter)) {
            return true;
          }
          return false;
        })
        .filter((row) => {
          if (dayFilter === null) {
            return true;
          }
          if (row["曜日・時限"].includes(dayFilter)) {
            return true;
          }
          return false;
        })
    );
  }, [semesterFilter, initialData, timeFilter, dayFilter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSemesterFilterChange = (event) => {
    setSemesterFilter({
      ...semesterFilter,
      [event.target.name]: event.target.checked,
    });
  };

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const handleDayFilterChange = (event) => {
    setDayFilter(event.target.value);
  };

  const columns = useMemo(() => {
    if (initialData.length === 0) {
      return [];
    }

    return Object.keys(initialData[0]).map((key) => ({
      field: key,
      headerName: key,
      width: key === "No." ? 10 : key === "科目" ? 400 : 100,
      renderCell: (params) =>
        key === "科目" ? (
          <a href={params.value.link} target="_blank" rel="noopener noreferrer">
            {params.value.科目}
          </a>
        ) : undefined,
    }));
  }, [initialData]);

  return (
    <Box sx={{ width: "100%", height: 1000 }}>
      <Select
        labelId="day-label"
        value={dayFilter}
        onChange={handleDayFilterChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 224,
              width: "auto",
            },
          },
        }}
        renderValue={(selected) => selected || "時限"}
      >
        <MenuItem value={null}>選択してください</MenuItem>
        {dayOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <Select
        labelId="time-label"
        value={timeFilter}
        onChange={handleTimeFilterChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 224,
              width: "auto",
            },
          },
        }}
        renderValue={(selected) => selected || "時限"}
      >
        <MenuItem value={null}>選択してください</MenuItem>
        {timeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormControlLabel
        control={
          <Checkbox
            checked={semesterFilter.firstSemester}
            onChange={handleSemesterFilterChange}
            name="firstSemester"
          />
        }
        label="前学期"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={semesterFilter.secondSemester}
            onChange={handleSemesterFilterChange}
            name="secondSemester"
          />
        }
        label="後学期"
      />
      <DataGrid
        rows={filteredData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default MaterialTable;
