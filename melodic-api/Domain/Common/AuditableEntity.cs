﻿namespace Domain.Common;

public abstract class AuditableEntity
{
    // public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? LastModified { get; set; }

    public string? LastModifiedBy { get; set; }
    public byte DelFlg { get; set; }
}
