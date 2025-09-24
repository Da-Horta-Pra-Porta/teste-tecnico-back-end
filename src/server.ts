// src/server.ts
import 'express-async-errors'; 
import express, { Request, Response, NextFunction } from 'express'; 
import authRoutes from './modules/auth/routes/auth.routes';
import adminRoutes from './modules/admin/routes/admin.routes'; 
import studentRoutes from './modules/student/routes/student.routes'; 
import { producerRoutes } from './modules/producers/routes/producer.routes';
import { dashboardRoutes } from './modules/dashboard/routes/dashboard.routes';


const app = express();

app.use(express.json()); // Middleware para parsear JSON no corpo das requisições


app.use(authRoutes);

app.use(adminRoutes); 


// -- MIDDLEWARE DE TRATAMENTO DE ERROS --
// Este middleware deve ser o ÚLTIMO app.use() antes do app.listen()
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return response.status(400).json({
      message: error.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${error}`,
  });
});

const PORT = process.env.PORT || 3333; // Define a porta

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});