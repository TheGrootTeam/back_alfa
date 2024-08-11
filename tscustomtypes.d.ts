declare namespace Express {
  interface Request {
    query: {
      id: string;
      position: string;
      publicationDate: string;
      description: string;
      companyOwner: string;
      status: string;
    };
  }
}
