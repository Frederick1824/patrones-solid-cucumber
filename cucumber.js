module.exports = {
    default: {
        require: ['step_definitions/**/*.ts'],
        requireModule: ['ts-node/register'],
        format: ['summary'],
        paths: ['features/'],
        // publishQuiet: true
    }
};