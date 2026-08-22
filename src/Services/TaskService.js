import supabase from "./SupabaseService";

// Fetch all tasks
export const getAllTasks = async () => {
    try {
        const { data, error } = await supabase
            .from("tasks")
            .select("*");

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error fetching tasks:", error.message);
        return [];
    }
};

// Fetch tasks by subject
export const getTasksBySubject = async (subject) => {
    try {
        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .eq("subject", subject);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error fetching tasks:", error.message);
        return [];
    }
};

// Add a new task
export const createTask = async (task) => {
    try {
        const { data, error } = await supabase
            .from("tasks")
            .insert([task]);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error creating task:", error.message);
        return null;
    }
};

// Update a task
export const updateTask = async (taskId, updates) => {
    try {
        const { data, error } = await supabase
            .from("tasks")
            .update(updates)
            .eq("taskid", taskId);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error updating task:", error.message);
        return null;
    }
};

// Delete a task
export const deleteTask = async (taskId) => {
    try {
        const { data, error } = await supabase
            .from("tasks")
            .delete()
            .eq("taskid", taskId);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error deleting task:", error.message);
        return null;
    }
};
