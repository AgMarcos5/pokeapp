export const getEnvVariables = () => {
    import.meta.env.MODE;

    return {
        ...import.meta.env
    }
}