export default {
  "tableName": "course",
  "tableAlias": "Course",
  "query": {
    "show":true,
    "items": [
      {
        "name": "Id",
        "key": "id",
        "type": "varchar",
        "show": false,
        "placeholder": "Please Input Id"
      },
      {
        "name": "Institution",
        "key": "institution",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Institution"
      },
      {
        "name": "Term",
        "key": "term",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Term"
      },
      {
        "name": "Subject Abbr",
        "key": "subjectAbbr",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Subject Abbr"
      },
      {
        "name": "Subject Name",
        "key": "subjectName",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Subject Name"
      },
      {
        "name": "Focus On",
        "key": "focusOn",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Focus On"
      },
      {
        "name": "Crn",
        "key": "crn",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Crn"
      },
      {
        "name": "Course",
        "key": "course",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Course"
      },
      {
        "name": "Section",
        "key": "section",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Section"
      },
      {
        "name": "Title",
        "key": "title",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Title"
      },
      {
        "name": "Credits",
        "key": "credits",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Credits"
      },
      {
        "name": "Instructor",
        "key": "instructor",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Instructor"
      },
      {
        "name": "Curr Enrolled",
        "key": "currEnrolled",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Curr Enrolled"
      },
      {
        "name": "Seats Avail",
        "key": "seatsAvail",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Seats Avail"
      },
      {
        "name": "Curr Waitlisted",
        "key": "currWaitlisted",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Curr Waitlisted"
      },
      {
        "name": "Wait Avail",
        "key": "waitAvail",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Wait Avail"
      },
      {
        "name": "Days",
        "key": "days",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Days"
      },
      {
        "name": "Time",
        "key": "time",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Time"
      },
      {
        "name": "Room",
        "key": "room",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Room"
      },
      {
        "name": "Dates",
        "key": "dates",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Dates"
      },
      {
        "name": "Details Url",
        "key": "detailsUrl",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Details Url"
      },
      {
        "name": "Sources Url",
        "key": "sourcesUrl",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Sources Url"
      },
      {
        "name": "Creator",
        "key": "creator",
        "type": "varchar",
        "show": false,
        "placeholder": "Please Input Creator"
      },
      {
        "name": "Create Time",
        "key": "createTime",
        "type": "date",
        "show": false,
        "prop": {
          "type": "daterange",
          "rangeSeparator": "-",
          "startPlaceholder": "Start Date",
          "endPlaceholder": "End Date",
          "defaultTime": "['00:00:00', '23:59:59']"
        }
      },
      {
        "name": "Updater",
        "key": "updater",
        "type": "varchar",
        "show": false,
        "placeholder": "Please Input Updater"
      },
      {
        "name": "Update Time",
        "key": "updateTime",
        "type": "date",
        "show": false,
        "prop": {
          "type": "daterange",
          "rangeSeparator": "-",
          "startPlaceholder": "Start Date",
          "endPlaceholder": "End Date",
          "defaultTime": "['00:00:00', '23:59:59']"
        }
      },
      {
        "name": "Deleted",
        "key": "deleted",
        "type": "varchar",
        "show": false,
        "placeholder": "Please Input Deleted"
      },
      {
        "name": "Tenant Id",
        "key": "tenantId",
        "type": "varchar",
        "show": false,
        "placeholder": "Please Input Tenant Id"
      }
    ],
    "operator": {
      "institutionOp": "sw",
      "termOp": "sw",
      "subjectAbbrOp": "sw",
      "subjectNameOp": "sw",
      "focusOnOp": "sw",
      "crnOp": "sw",
      "courseOp": "sw",
      "sectionOp": "sw",
      "titleOp": "sw",
      "creditsOp": "sw",
      "instructorOp": "sw",
      "currEnrolledOp": "sw",
      "seatsAvailOp": "sw",
      "currWaitlistedOp": "sw",
      "waitAvailOp": "sw",
      "daysOp": "sw",
      "timeOp": "sw",
      "roomOp": "sw",
      "datesOp": "sw",
      "detailsUrlOp": "sw",
      "creatorOp": "sw",
      "createTimeOp": "bt",
      "updaterOp": "sw",
      "updateTimeOp": "bt"
    },
    "button": {
      "queryButtonName": "Query",
      "resetButtonName": "Reset"
    }
  },
  "toolBar": {
    "show": true,
    "addButtonShow": true,
    "exportButtonShow": true,
    "exportAllButtonShow": true,
    "addButtonName": "Add",
    "exportButtonName": "Export",
    "exportAllButtonName": "Export All"
  },
  "table": {
    "selectionShow": true,
    "numberShow": true,
    "items": [
      {
        "name": "Id",
        "key": "id",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": false
      },
      {
        "name": "Institution",
        "key": "institution",
        "type": "varchar",
        "align": "center",
        "show": true
      },
      {
        "name": "Term",
        "key": "term",
        "type": "varchar",
        "align": "center",
        "show": true
      },
      {
        "name": "Subject Abbr",
        "key": "subjectAbbr",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": false
      },
      {
        "name": "Subject Name",
        "key": "subjectName",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": false
      },
      {
        "name": "Focus On",
        "key": "focusOn",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Crn",
        "key": "crn",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Course",
        "key": "course",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Section",
        "key": "section",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Title",
        "key": "title",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Credits",
        "key": "credits",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Instructor",
        "key": "instructor",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Curr Enrolled",
        "key": "currEnrolled",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Seats Avail",
        "key": "seatsAvail",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Curr Waitlisted",
        "key": "currWaitlisted",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Wait Avail",
        "key": "waitAvail",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Days",
        "key": "days",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Time",
        "key": "time",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Room",
        "key": "room",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Dates",
        "key": "dates",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Details Url",
        "key": "detailsUrl",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Sources Url",
        "key": "sourcesUrl",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": true
      },
      {
        "name": "Creator",
        "key": "creator",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": false
      },
      {
        "name": "Create Time",
        "key": "createTime",
        "type": "date",
        "align": "center",
        "height": "100px",
        "show": false
      },
      {
        "name": "Updater",
        "key": "updater",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": false
      },
      {
        "name": "Update Time",
        "key": "updateTime",
        "type": "date",
        "align": "center",
        "height": "100px",
        "show": false
      },
      {
        "name": "Deleted",
        "key": "deleted",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": false
      },
      {
        "name": "Tenant Id",
        "key": "tenantId",
        "type": "varchar",
        "align": "center",
        "height": "100px",
        "show": false
      }
    ],
    "operation": {
      "show": true,
      "align": "center",
      "updateButtonShow": true,
      "deleteButtonShow": true,
      "updateButtonName": "Edit",
      "deleteButtonName": "Delete"
    }
  },
  "form": {
    "width": '1000px',
    "labelWidth": '150px',
    "items": [
      {
        "name": "Id",
        "key": "id",
        "type": "varchar",
        "show": false,
        "placeholder": "Please Input Id"
      },
      {
        "name": "Institution",
        "key": "institution",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Institution"
      },
      {
        "name": "Term",
        "key": "term",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Term"
      },
      {
        "name": "Subject Abbr",
        "key": "subjectAbbr",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Subject Abbr"
      },
      {
        "name": "Subject Name",
        "key": "subjectName",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Subject Name"
      },
      {
        "name": "Focus On",
        "key": "focusOn",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Focus On"
      },
      {
        "name": "Crn",
        "key": "crn",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Crn"
      },
      {
        "name": "Course",
        "key": "course",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Course"
      },
      {
        "name": "Section",
        "key": "section",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Section"
      },
      {
        "name": "Title",
        "key": "title",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Title"
      },
      {
        "name": "Credits",
        "key": "credits",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Credits"
      },
      {
        "name": "Instructor",
        "key": "instructor",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Instructor"
      },
      {
        "name": "Curr Enrolled",
        "key": "currEnrolled",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Curr Enrolled"
      },
      {
        "name": "Seats Avail",
        "key": "seatsAvail",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Seats Avail"
      },
      {
        "name": "Curr Waitlisted",
        "key": "currWaitlisted",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Curr Waitlisted"
      },
      {
        "name": "Wait Avail",
        "key": "waitAvail",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Wait Avail"
      },
      {
        "name": "Days",
        "key": "days",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Days"
      },
      {
        "name": "Time",
        "key": "time",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Time"
      },
      {
        "name": "Room",
        "key": "room",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Room"
      },
      {
        "name": "Dates",
        "key": "dates",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Dates"
      },
      {
        "name": "Details Url",
        "key": "detailsUrl",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Details Url"
      },
      {
        "name": "Sources Url",
        "key": "sourcesUrl",
        "type": "varchar",
        "show": true,
        "placeholder": "Please Input Sources Url"
      },
      {
        "name": "Creator",
        "key": "creator",
        "type": "varchar",
        "show": false,
        "placeholder": "Please Input Creator"
      },
      {
        "name": "Create Time",
        "key": "createTime",
        "type": "date",
        "show": false,
        "prop": {
          "type": "daterange",
          "rangeSeparator": "-",
          "startPlaceholder": "Start Date",
          "endPlaceholder": "End Date",
          "defaultTime": "['00:00:00', '23:59:59']"
        }
      },
      {
        "name": "Updater",
        "key": "updater",
        "type": "varchar",
        "show": false,
        "placeholder": "Please Input Updater"
      },
      {
        "name": "Update Time",
        "key": "updateTime",
        "type": "date",
        "show": true,
        "placeholder": "Please Input Update Time",
        "prop": {
          "type": "datetime",
          "valueFormat":"yyyy-MM-dd HH:mm:ss",
        }
      },
      {
        "name": "Deleted",
        "key": "deleted",
        "type": "varchar",
        "show": false,
        "placeholder": "Please Input Deleted"
      },
      {
        "name": "Tenant Id",
        "key": "tenantId",
        "type": "varchar",
        "show": false,
        "placeholder": "Please Input Tenant Id"
      }
    ],
    "button": {
      "confimButtonName": "Comfirm",
      "cancelButtonName": "Cancel"
    }
  }
}
