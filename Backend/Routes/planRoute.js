const express = require('express');
const router = express.Router();
const { createPlan, getPlans, getPlanById, updatePlan, deletePlan } = require('../Controllers/planControllers');

// Plan Routes
router.post('/createplan', createPlan); // Create a new plan
router.get('/fetchplans', getPlans); // Fetch all plans with pagination
router.get('/plan/:id', getPlanById); // Fetch a single plan by ID
router.put('/update/:id', updatePlan); // Update a plan by ID
router.delete('/delete/:id', deletePlan); // Delete a plan by ID

module.exports = router;
