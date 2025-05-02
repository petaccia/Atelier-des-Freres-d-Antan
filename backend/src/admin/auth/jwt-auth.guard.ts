import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Gère les erreurs d'authentification avec des messages plus clairs
   */
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // Si une erreur est survenue ou si l'utilisateur n'est pas trouvé
    if (err || !user) {
      let message = 'Accès non autorisé';

      // Personnaliser le message en fonction du type d'erreur
      if (info) {
        if (info.name === 'TokenExpiredError') {
          message = 'Votre session a expiré, veuillez vous reconnecter';
        } else if (info.name === 'JsonWebTokenError') {
          message = 'Token d\'authentification invalide';
        }
      }

      throw new UnauthorizedException(message);
    }

    return user;
  }
}