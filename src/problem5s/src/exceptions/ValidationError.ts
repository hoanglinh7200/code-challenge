class ValidationError extends Error {
    public statusCode: any;
    public data: any;

    constructor(message: string, status?: number, data?: any) {
        super(message);
        this.statusCode = status || 500;
        this.data = data || [];
    }
}
export default ValidationError;