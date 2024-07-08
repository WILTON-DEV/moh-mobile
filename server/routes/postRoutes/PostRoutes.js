const express = require("express");

const PostModel = require("../../models/post/PostModel");

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const posts = await PostModel.findAll({});

    res.status(200).json({
      status: "success",
      results: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// router.post("/", UploadImage.single("image"), async (req, res) => {
//   console.log("File===", req.file.path);

//   try {
//     const {
//       reportedBy,
//       priority,
//       facilityLevel,
//       facility,
//       issueCategory,
//       issueModule,
//       issueSystem,
//       phoneNo,
//       issueDesc,
//       changeDesc,
//       agentId,
//     } = req.body;

//     const imagePath = req.file.path;

//     const ticket = await TicketModel.create({
//       reportedBy,
//       priority,
//       facilityLevel,
//       facility,
//       issueCategory,
//       issueModule,
//       issueSystem,
//       phoneNo,
//       issueDesc,
//       changeDesc,
//       agentId,
//       imagePath,
//     });

//     res.status(201).json({
//       status: "success",
//       ticket,
//     });
//   } catch (error) {
//     if (error.name === "SequelizeValidationError") {
//       const validationErrors = error.errors.map((err) => ({
//         field: err.path,
//         message: err.message,
//       }));
//       res.status(400).json({
//         status: "error",
//         message: "Validation error",
//         errors: validationErrors,
//       });
//     } else {
//       res.status(500).json({
//         status: "error",
//         message: error.message,
//       });
//     }
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const page = req.query.page || 1;
//     const limit = req.query.limit || 10;
//     const skip = (page - 1) * limit;

//     const tickets = await TicketModel.findAll({
//       limit,
//       offset: skip,
//       include: [{ model: User }],
//     });

//     res.status(200).json({
//       status: "success",
//       results: tickets.length,
//       tickets,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// });

// router.get("/count", async (req, res) => {
//   try {
//     const tickets = await TicketModel.findAll();

//     // Counting items based on status
//     let unassignedCount = 0;
//     let closedCount = 0;
//     let assignedCount = 0;
//     let inProgressCount = 0;

//     tickets.forEach((ticket) => {
//       switch (ticket.status) {
//         case "Assigned":
//           assignedCount++;
//           break;
//         case "Closed":
//           closedCount++;
//           break;
//         case "UnAssigned":
//           unassignedCount++;
//           break;
//         case "InProgress":
//           inProgressCount++;
//           break;
//         default:
//           break;
//       }
//     });

//     res.status(200).json({
//       status: "success",
//       results: tickets.length,
//       tickets,
//       statusCounts: {
//         unassigned: unassignedCount,
//         closed: closedCount,
//         assigned: assignedCount,
//         inProgress: inProgressCount,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// });

// router.patch("/:id", async (req, res) => {
//   try {
//     const result = await TicketModel.update(
//       { ...req.body, updatedAt: Date.now() },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );

//     if (result[0] === 0) {
//       return res.status(404).json({
//         status: "fail",
//         message: "Ticket with that ID not found",
//       });
//     }

//     const ticket = await TicketModel.findByPk(req.params.id);

//     res.status(200).json({
//       status: "success",
//       ticket,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const ticket = await TicketModel.findByPk(req.params.id);

//     if (!ticket) {
//       return res.status(404).json({
//         status: "fail",
//         message: "Ticket with that ID not found",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       ticket,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const result = await TicketModel.destroy({
//       where: { id: req.params.id },
//       force: true,
//     });

//     if (result === 0) {
//       return res.status(404).json({
//         status: "fail",
//         message: "Ticket with that ID not found",
//       });
//     }

//     res.status(204).json();
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// });

module.exports = router;
