﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Speakers.Commands.DeleteSpeaker
{
    public class DeleteSpeakerCommand : IRequest<Unit>
    {
        public Guid Id { get; set; }

    }
}
