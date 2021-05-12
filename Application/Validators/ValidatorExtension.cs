using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Validators
{
    public static class ValidatorExtension
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                             .NotEmpty()
                             .MinimumLength(6)
                             .WithMessage("El password debe de tener mas de 6 caracteres")
                             .Matches("[A-Z]")
                             .WithMessage("El password debe de tener al menos una mayuscula")
                             .Matches("[a-z]")
                             .WithMessage("El password debe de tener al menos una minuscula")
                             .Matches("[0-9]")
                             .WithMessage("El password debe de tener al menos un digito")
                             .Matches("[^a-zA-Z-0-9]")
                             .WithMessage("El password debe de tener al menos un caracter especial");

            return options;
        }
    }
}
