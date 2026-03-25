/**
 * SkillBridge API Service
 * This JavaScript module handles all API calls to the Spring Boot backend
 * 
 * Base URL: http://localhost:8080/api
 */

class SkillBridgeAPI {
    constructor() {
        // Update this URL based on your backend server location
        this.baseURL = 'http://localhost:8080/api';
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }

    /**
     * Make a fetch request to the backend
     * @param {string} endpoint - API endpoint
     * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
     * @param {object} body - Request body (optional)
     * @returns {Promise} - Fetch promise
     */
    async request(endpoint, method = 'GET', body = null) {
        const url = `${this.baseURL}${endpoint}`;
        const options = {
            method: method,
            headers: this.headers,
            credentials: 'include'
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Check if response has content
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // ===== WORKER ENDPOINTS =====

    /**
     * Register a new worker
     * @param {object} workerData - Worker registration data
     * @returns {Promise}
     */
    async registerWorker(workerData) {
        return this.request('/workers/register', 'POST', workerData);
    }

    /**
     * Get all workers
     * @returns {Promise}
     */
    async getAllWorkers() {
        return this.request('/workers', 'GET');
    }

    /**
     * Get worker by ID
     * @param {number} workerId - Worker ID
     * @returns {Promise}
     */
    async getWorkerById(workerId) {
        return this.request(`/workers/${workerId}`, 'GET');
    }

    /**
     * Get matched jobs for a worker
     * @param {number} workerId - Worker ID
     * @returns {Promise}
     */
    async getMatchedJobs(workerId) {
        return this.request(`/workers/${workerId}/jobs`, 'GET');
    }

    // ===== JOB ENDPOINTS =====

    /**
     * Create a new job
     * @param {object} jobData - Job data
     * @returns {Promise}
     */
    async createJob(jobData) {
        return this.request('/jobs', 'POST', jobData);
    }

    /**
     * Get all jobs
     * @returns {Promise}
     */
    async getAllJobs() {
        return this.request('/jobs', 'GET');
    }

    /**
     * Get job by ID
     * @param {number} jobId - Job ID
     * @returns {Promise}
     */
    async getJobById(jobId) {
        return this.request(`/jobs/${jobId}`, 'GET');
    }

    /**
     * Search jobs by skill and location
     * @param {string} skill - Skill required
     * @param {string} location - Job location
     * @returns {Promise}
     */
    async searchJobs(skill, location) {
        const params = new URLSearchParams({
            skill: skill,
            location: location
        });
        return this.request(`/jobs/search?${params}`, 'GET');
    }

    /**
     * Update a job
     * @param {number} jobId - Job ID
     * @param {object} jobData - Updated job data
     * @returns {Promise}
     */
    async updateJob(jobId, jobData) {
        return this.request(`/jobs/${jobId}`, 'PUT', jobData);
    }

    /**
     * Delete a job
     * @param {number} jobId - Job ID
     * @returns {Promise}
     */
    async deleteJob(jobId) {
        return this.request(`/jobs/${jobId}`, 'DELETE');
    }

    // ===== HIRER/CUSTOMER ENDPOINTS =====

    /**
     * Register a new hirer/customer
     * @param {object} hirerData - Hirer registration data
     * @returns {Promise}
     */
    async registerHirer(hirerData) {
        return this.request('/hirers/register', 'POST', hirerData);
    }

    /**
     * Get all hirers
     * @returns {Promise}
     */
    async getAllHirers() {
        return this.request('/hirers', 'GET');
    }

    /**
     * Get hirer by ID
     * @param {number} hirerId - Hirer ID
     * @returns {Promise}
     */
    async getHirerById(hirerId) {
        return this.request(`/hirers/${hirerId}`, 'GET');
    }

    /**
     * Get hirer by email
     * @param {string} email - Hirer email
     * @returns {Promise}
     */
    async getHirerByEmail(email) {
        return this.request(`/hirers/email/${email}`, 'GET');
    }

    /**
     * Update hirer
     * @param {number} hirerId - Hirer ID
     * @param {object} hirerData - Updated hirer data
     * @returns {Promise}
     */
    async updateHirer(hirerId, hirerData) {
        return this.request(`/hirers/${hirerId}`, 'PUT', hirerData);
    }

    /**
     * Delete hirer
     * @param {number} hirerId - Hirer ID
     * @returns {Promise}
     */
    async deleteHirer(hirerId) {
        return this.request(`/hirers/${hirerId}`, 'DELETE');
    }

    // ===== AUTHENTICATION ENDPOINTS =====

    /**
     * Worker login
     * @param {string} email - Worker email
     * @param {string} password - Worker password
     * @returns {Promise}
     */
    async loginWorker(email, password) {
        return this.request('/workers/login', 'POST', { email, password });
    }

    /**
     * Hirer login
     * @param {string} email - Hirer email
     * @param {string} password - Hirer password
     * @returns {Promise}
     */
    async loginHirer(email, password) {
        return this.request('/hirers/login', 'POST', { email, password });
    }

    /**
     * Get worker by email
     * @param {string} email - Worker email
     * @returns {Promise}
     */
    async getWorkerByEmail(email) {
        return this.request(`/workers/email/${email}`, 'GET');
    }
}

// Create a global instance
const skillBridgeAPI = new SkillBridgeAPI();
