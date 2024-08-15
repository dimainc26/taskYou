// middlewares/errorHandler.js

import logger from "../utils/logger.js";

class ErrorHandler {
  handleError(err, res) {
    // Journaliser l'erreur
    logger.error(err);

    // Si l'erreur est opérationnelle, répondre au client
    if (err.isOperational) {
      return res.status(err.statusCode || 500).json({
        error: err.message || "Une erreur est survenue",
      });
    } else {
      // Pour les erreurs non opérationnelles (erreurs critiques)
      process.exit(1);
    }
  }

  isTrustedError(err) {
    return err.isOperational;
  }
}

export default new ErrorHandler();

export const globalErrorHandler = (err, req, res, next) => {
  const handler = new ErrorHandler(); // Créez une instance pour accéder à `handleError`
  handler.handleError(err, res);
};
