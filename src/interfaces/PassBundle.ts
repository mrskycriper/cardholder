import Pass from "./Pass";

export default interface PassBundle {
    id: string,
    objects: {
        pass: Pass,
    },
    files: {
        logo?: File,
    }
}