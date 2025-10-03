import React, { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { LogsModal } from "../components/LogsModal";
import { RecordingPlayerButtons } from "../components/RecordingPlayerButtons";
import { AssessmentResultsList } from "../DynamicData.js";
 
import { IoPlayOutline } from "react-icons/io5";
import { TbReload } from "react-icons/tb";
import { GoDownload } from "react-icons/go";
 
const BUTTON_CONFIG = [
  { 
    Icon: IoPlayOutline, 
    label: "Play recording", 
    key: "play" 
  },
  { 
    Icon: TbReload, 
    label: "Replay recording", 
    key: "reload" 
  },
  { 
    Icon: GoDownload, 
    label: "Download recording", 
    key: "download" 
  },
];

const AssessmentResults = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLogs, setCurrentLogs] = useState("");

  const handleViewMore = React.useCallback((logs) => {
    setCurrentLogs(logs);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentLogs("");
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "assessmentId",
        header: "Assessment ID",
        muiTableHeadCellProps: {
          sx: {
            position: "sticky",
            left: 0,
            zIndex: 2,
            background: "#f9fafb",
            paddingTop: "20px",
            paddingBottom: "18px",
            fontFamily: "Inter",
            fontWeight: 600,
            color: "#6B7280",
          },
        },
        muiTableBodyCellProps: {
          sx: {
            position: "sticky",
            left: 0,
            zIndex: 1,
            background: "white",
            fontFamily: "Inter",
            fontWeight: 500,
          },
        },
      },
      {
        accessorKey: "patientName",
        header: "Patient Name",
        size: 200,
        muiTableHeadCellProps: {
          sx: {
            textAlign: "center",
            paddingTop: "20px",
            background: "#f9fafb",
            paddingBottom: "18px",
            fontFamily: "Inter",
            color: "#6B7280",
          },
        },
        muiTableBodyCellProps: {
          sx: {
            fontFamily: "Inter",
            fontWeight: 500,
            color: "#6B7280",
          },
        },
      },
      {
        accessorKey: "patientId",
        header: "Patient ID",
        size: 200,
        muiTableHeadCellProps: {
          sx: {
            textAlign: "center",
            paddingTop: "20px",
            background: "#f9fafb",
            paddingBottom: "18px",
            fontFamily: "Inter",
            color: "#6B7280",
          },
        },
        muiTableBodyCellProps: {
          sx: {
            fontFamily: "Inter",
            fontWeight: 500,
            color: "#6B7280",
          },
        },
      },
      {
        accessorKey: "assignedTest",
        header: "Assigned Test",
        size: 200,
        muiTableHeadCellProps: {
          sx: {
            textAlign: "center",
            paddingTop: "20px",
            background: "#f9fafb",
            paddingBottom: "18px",
            fontFamily: "Inter",
            color: "#6B7280",
          },
        },
        muiTableBodyCellProps: {
          sx: {
            fontFamily: "Inter",
            fontWeight: 500,
            color: "#6B7280",
          },
        },
      },
      {
        accessorKey: "scheduledTime",
        header: "Scheduled Time",
        size: 200,
        muiTableHeadCellProps: {
          sx: {
            textAlign: "center",
            paddingTop: "20px",
            background: "#f9fafb",
            paddingBottom: "18px",
            fontFamily: "Inter",
            color: "#6B7280",
          },
        },
        muiTableBodyCellProps: {
          sx: {
            fontFamily: "Inter",
            fontWeight: 500,
            color: "#6B7280",
          },
        },
      },
      {
        accessorKey: "currentStatus",
        header: "Current Status",
        size: 200,
        muiTableHeadCellProps: {
          sx: {
            textAlign: "center",
            paddingTop: "20px",
            background: "#f9fafb",
            paddingBottom: "18px",
            fontFamily: "Inter",
            color: "#6B7280",
          },
        },
        muiTableBodyCellProps: {
          sx: {
            fontFamily: "Inter",
            fontWeight: 500,
            color: "#6B7280",
          },
        },
      },
      {
        accessorKey: "awazCallId",
        header: "Awaz Call ID",
        size: 200,
        muiTableHeadCellProps: {
          sx: {
            textAlign: "center",
            paddingTop: "20px",
            background: "#f9fafb",
            paddingBottom: "18px",
            fontFamily: "Inter",
            color: "#6B7280",
          },
        },
        muiTableBodyCellProps: {
          sx: {
            fontFamily: "Inter",
            fontWeight: 500,
            color: "#6B7280",
          },
        },
      },
      {
        accessorKey: "awazScheduledId",
        header: "Awaz Scheduled ID",
        size: 250,
        muiTableHeadCellProps: {
          sx: {
            textAlign: "center",
            paddingTop: "20px",
            background: "#f9fafb",
            paddingBottom: "18px",
            fontFamily: "Inter",
            color: "#6B7280",
          },
        },
        muiTableBodyCellProps: {
          sx: {
            fontFamily: "Inter",
            fontWeight: 500,
            color: "#6B7280",
          },
        },
      },
      {
        accessorKey: "report",
        header: "Report",
        muiTableHeadCellProps: {
          sx: {
            textAlign: "center",
            paddingTop: "20px",
            background: "#f9fafb",
            paddingBottom: "18px",
            fontFamily: "Inter",
            color: "#6B7280",
          },
        },
        muiTableBodyCellProps: {
          sx: {
            fontFamily: "Inter",
            fontWeight: 500,
            color: "#6B7280",
          },
        },
        Cell: () => (
          <button className="text-gray-600 text-[15px] underline cursor-pointer">
            View Report
          </button>
        ),
      },
      {
        accessorKey: "recording",
        header: "Recording",
        size: 200,
        muiTableHeadCellProps: {
          sx: {
            textAlign: "center",
            paddingTop: "20px",
            background: "#f9fafb",
            paddingBottom: "18px",
            fontFamily: "Inter",
            color: "#6B7280",
          },
        },
        muiTableBodyCellProps: {
          sx: {
            fontFamily: "Inter",
            fontWeight: 300,
          },
        },
        Cell: () => <RecordingPlayerButtons BUTTON_CONFIG={BUTTON_CONFIG}/>,
      },
      {
        accessorKey: "logs",
        header: "Logs",
        size: 400,
        enablePinning: true,
        pinned: "right",
        muiTableHeadCellProps: {
          sx: {
            position: "sticky",
            right: 0,
            zIndex: 2,
            background: "#f9fafb",
            paddingTop: "20px",
            paddingBottom: "18px",
            fontFamily: "Inter",
            color: "#6B7280",
          },
        },
        muiTableBodyCellProps: {
          sx: {
            position: "sticky",
            right: 0,
            zIndex: 1,
            background: "white",
          },
        },
        Cell: ({ row }) => {
          const logText = row.original.logs;
          const lines = logText
            .split("|")
            .map((line) => line.trim())
            .filter((line) => line.length > 0);

          const preview = lines[0] || "No logs found";
          const cleanPreview = preview
            .replace(/^\[.*?\]\s*/, "")
            .split(" - ")[0];

          return (
            <div className="flex flex-col">
              <p className="line-clamp-2 text-sm text-gray-700">
                {cleanPreview}
              </p>

              {lines.length > 1 && (
                <button
                  onClick={() => handleViewMore(logText)}
                  className="text-color underline text-md mt-0.5 text-left font-[600] cursor-pointer"
                >
                  ...More ({lines.length} total)
                </button>
              )}
            </div>
          );
        },
      },
    ],
    [handleViewMore]
  );

  return (
    <div className="mt-6">
      <MaterialReactTable
        columns={columns}
        data={AssessmentResultsList}
        enableColumnResizing
        enablePagination
        enableSorting
        enableColumnPinning
        muiTablePaperProps={{
          elevation: 0,
          sx: { borderRadius: "0.75rem", border: "1px solid #e5e7eb" },
        }}
      />

      <LogsModal
        isVisible={isModalOpen}
        logs={currentLogs}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default AssessmentResults;
