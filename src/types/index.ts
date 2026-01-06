// Common API Response wrapper
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    count?: number;
}

// School Types
export interface School {
    schoolId: string;
    schoolName: string;
    schoolLogo?: string;
    schoolDbName: string;
    status: "active" | "inactive";
    schoolAddress?: string;
    schoolEmail?: string;
    schoolContact?: string;
    schoolWebsite?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateSchoolPayload {
    schoolName: string;
    schoolLogo?: string;
    dbName: string;
    schoolAddress?: string;
    schoolEmail?: string;
    schoolContact?: string;
    schoolWebsite?: string;
}

export interface UpdateSchoolPayload {
    schoolName?: string;
    schoolLogo?: string;
    status?: "active" | "inactive";
    schoolAddress?: string;
    schoolEmail?: string;
    schoolContact?: string;
    schoolWebsite?: string;
}

// Admin Types (Super Admin)
export interface Admin {
    adminId: string;
    username: string;
    email: string;
    role: "super_admin";
    status?: "active" | "inactive";
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateAdminPayload {
    username: string;
    email: string;
    password: string;
}

// School Admin (sch_admin) Types
export interface SchoolAdmin {
    userId: string;
    username: string;
    email: string;
    role: "sch_admin";
    schoolId: string;
    contactNumber?: string;
    status: "active" | "inactive";
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateSchoolAdminPayload {
    username: string;
    email: string;
    password: string;
    schoolId: string;
    contactNumber?: string;
}

export interface UpdateSchoolAdminPayload {
    username?: string;
    email?: string;
    password?: string;
    contactNumber?: string;
    status?: "active" | "inactive";
}

// Teacher Types
export interface Teacher {
    teacherId: string;
    schoolId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    department?: string;
    subjects: string[];
    classes: string[];
    status: "active" | "inactive";
    profileImage?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateTeacherPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    department?: string;
    subjects?: string[];
    classes?: string[];
    status?: "active" | "inactive";
    profileImage?: string;
}

export interface UpdateTeacherPayload {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    department?: string;
    subjects?: string[];
    classes?: string[];
    status?: "active" | "inactive";
    profileImage?: string;
}

// Student Types
export interface Student {
    studentId: string;
    schoolId: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    class: string;
    section?: string;
    rollNumber?: string;
    parentId?: string;
    dateOfBirth?: string;
    gender?: "male" | "female" | "other";
    address?: string;
    status: "active" | "inactive";
    profileImage?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateStudentPayload {
    firstName: string;
    lastName: string;
    email?: string;
    password: string;
    phone?: string;
    class: string;
    section?: string;
    rollNumber?: string;
    parentId?: string;
    dateOfBirth?: string;
    gender?: "male" | "female" | "other";
    address?: string;
    status?: "active" | "inactive";
    profileImage?: string;
}

export interface UpdateStudentPayload {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    class?: string;
    section?: string;
    rollNumber?: string;
    parentId?: string;
    dateOfBirth?: string;
    gender?: "male" | "female" | "other";
    address?: string;
    status?: "active" | "inactive";
    profileImage?: string;
}

// Parent Types
export interface Parent {
    parentId: string;
    schoolId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    studentIds: string[];
    relationship: "father" | "mother" | "guardian" | "other";
    occupation?: string;
    address?: string;
    status: "active" | "inactive";
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateParentPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    studentIds?: string[];
    relationship: "father" | "mother" | "guardian" | "other";
    occupation?: string;
    address?: string;
    status?: "active" | "inactive";
}

export interface UpdateParentPayload {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    studentIds?: string[];
    relationship?: "father" | "mother" | "guardian" | "other";
    occupation?: string;
    address?: string;
    status?: "active" | "inactive";
}

// Query Filter Types
export interface TeacherFilters {
    department?: string;
    status?: "active" | "inactive";
}

export interface StudentFilters {
    class?: string;
    section?: string;
    status?: "active" | "inactive";
    parentId?: string;
}

export interface ParentFilters {
    status?: "active" | "inactive";
    relationship?: "father" | "mother" | "guardian" | "other";
}

// Request/Ticket Types
export interface Request {
    requestId: string;
    userType: "teacher" | "student" | "parent" | "sch_admin";
    userId: string;
    userName: string;
    requestType: "email_change" | "phone_change" | "general";
    oldValue?: string;
    newValue?: string;
    message: string;
    status: "pending" | "approved" | "rejected";
    adminReply?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateRequestPayload {
    userType: "teacher" | "student" | "parent" | "sch_admin";
    userId: string;
    userName: string;
    requestType: "email_change" | "phone_change" | "general";
    oldValue?: string;
    newValue?: string;
    message: string;
}

export interface UpdateRequestPayload {
    status: "pending" | "approved" | "rejected";
    adminReply?: string;
}

export interface RequestFilters {
    status?: "pending" | "approved" | "rejected";
    userType?: "teacher" | "student" | "parent" | "sch_admin";
}