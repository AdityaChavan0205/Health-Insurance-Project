const Plan = require('../Models/Plan');

exports.createPlan = async (req, res) => {

    try {

        const { name, description, monthlyPremium, duration, benefits, keyFeatures, image } = req.body;

        // Check if all required fields are provided
        if(!name || !description ||  !monthlyPremium || !duration || !benefits || !keyFeatures || !image) {
            return res.status(400).json({ error: "Please provide all required fields" });
        }

        // Check if plan already exists
        const planExists = await Plan.findOne({ name });
        if(planExists) {
            return res.status(400).json({ error: "Plan already exists" });
        }

        // Auto-calculate yearly premium
        const yearlyPremium = monthlyPremium * 12;

        if (keyFeatures.length !== 7) {
            return res.status(400).json({ message: "Each plan must have exactly 7 key features." });
        }

        const newPlan = new Plan({ name,description,monthlyPremium,yearlyPremium,duration,benefits,keyFeatures,image });
        await newPlan.save();

        console.log("Plan created successfully -->> ",newPlan);
        res.status(201).json({ message: "Plan created successfully", data: newPlan });

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    } 
}

exports.getPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        console.log("All Plans fetched successfully -->> ",plans);
        res.status(200).json({ data: plans });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
}

exports.getPlanById = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);
        if(!plan) {
            return res.status(404).json({ error: "Plan not found" });
        }
        console.log("Single Plans fetched successfully -->> ",plan);
        
        res.status(200).json({ data: plan });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
}

exports.updatePlan = async (req, res) => {

    try {
        const plan = await Plan.findById(req.params.id);
        if(!plan) {
            return res.status(404).json({ error: "Plan not found" });
        }
        const { name, description, monthlyPremium, duration, benefits, keyFeatures, image } = req.body;

        // Check if all required fields are provided
        if(!name || !description ||  !monthlyPremium || !duration || !benefits || !keyFeatures || !image) {
            return res.status(400).json({ error: "Please provide all required fields" });
        }

        // Auto-calculate yearly premium
        const yearlyPremium = monthlyPremium * 12;

        if (keyFeatures.length !== 7) {
            return res.status(400).json({ message: "Each plan must have exactly 7 key features." });
        }

        plan.name = name;
        plan.description = description;
        plan.monthlyPremium = monthlyPremium;
        plan.yearlyPremium = yearlyPremium;
        plan.duration = duration;
        plan.benefits = benefits;
        plan.keyFeatures = keyFeatures;
        plan.image = image;

        await plan.save();
        res.status(200).json({ message: "Plan updated successfully", data: plan });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
}

exports.deletePlan = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);
        if(!plan) {
            return res.status(404).json({ error: "Plan not found" });
        }
        await plan.remove();
        res.status(200).json({ message: "Plan deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
}