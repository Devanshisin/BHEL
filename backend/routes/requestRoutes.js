const express = require('express');
const router = express.Router();
const { 
  createRequest,
  getRequests,
  getRequest,
  approveRequest,
  rejectRequest,
  hostApplication,
  rejectHostApplication,
  clearReviewerHistory
} = require('../controllers/requestController');
const { requireAuth } = require('../middleware/auth');

// Request routes
router.post('/requests', requireAuth, createRequest);
router.get('/requests', requireAuth, getRequests);
router.get('/requests/:id', requireAuth, getRequest);
router.patch('/requests/:id/approve', requireAuth, approveRequest);
router.patch('/requests/:id/reject', requireAuth, rejectRequest);
router.patch('/requests/:id/host', requireAuth, hostApplication);
router.patch('/requests/:id/host-reject', requireAuth, rejectHostApplication);

// Clear reviewer history (Reviewer only)
router.patch('/requests/clear-history/reviewer', requireAuth, (req, res, next) => {
  if (req.user.role !== 'Reviewer') return res.status(403).json({ message: 'Forbidden' });
  clearReviewerHistory(req, res, next);
});

module.exports = router;