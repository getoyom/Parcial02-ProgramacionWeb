CREATE TABLE dbo.Categories (
    CategoryId INT IDENTITY(1, 1) NOT NULL,
    Name NVARCHAR(80) NOT NULL,
    CreatedAt DATETIME2(0) NOT NULL
        CONSTRAINT DF_Categories_CreatedAt DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_Categories PRIMARY KEY (CategoryId),
    CONSTRAINT UQ_Categories_Name UNIQUE (Name)
);
GO

CREATE TABLE dbo.Products (
    ProductId INT IDENTITY(1, 1) NOT NULL,
    CategoryId INT NOT NULL,
    Sku NVARCHAR(32) NOT NULL,
    Name NVARCHAR(160) NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    StockQuantity INT NOT NULL
        CONSTRAINT DF_Products_StockQuantity DEFAULT (0),
    IsActive BIT NOT NULL
        CONSTRAINT DF_Products_IsActive DEFAULT (1),
    CreatedAt DATETIME2(0) NOT NULL
        CONSTRAINT DF_Products_CreatedAt DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2(0) NOT NULL
        CONSTRAINT DF_Products_UpdatedAt DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_Products PRIMARY KEY (ProductId),
    CONSTRAINT UQ_Products_Sku UNIQUE (Sku),
    CONSTRAINT CK_Products_UnitPrice CHECK (UnitPrice > 0),
    CONSTRAINT CK_Products_StockQuantity CHECK (StockQuantity >= 0),
    CONSTRAINT FK_Products_Categories FOREIGN KEY (CategoryId)
        REFERENCES dbo.Categories (CategoryId)
);
GO

CREATE INDEX IX_Products_CategoryId_IsActive
    ON dbo.Products (CategoryId, IsActive);
GO

INSERT INTO dbo.Categories (Name)
VALUES (N'Computación'), (N'Audio'), (N'Accesorios'), (N'Oficina');
GO

INSERT INTO dbo.Products (Sku, Name, CategoryId, UnitPrice, StockQuantity)
SELECT seed.Sku, seed.ProductName, category.CategoryId, seed.UnitPrice, seed.StockQuantity
FROM (VALUES
    (N'MON-LG-27', N'Monitor LG UltraWide 27"', N'Computación', CAST(1899.00 AS DECIMAL(10, 2)), 12),
    (N'AUD-SNY-05', N'Audífonos Sony WH-1000XM5', N'Audio', CAST(2699.00 AS DECIMAL(10, 2)), 7),
    (N'TEC-KCH-K2', N'Teclado Keychron K2 Pro', N'Accesorios', CAST(1120.00 AS DECIMAL(10, 2)), 24),
    (N'MOU-LOG-3S', N'Mouse Logitech MX Master 3S', N'Accesorios', CAST(849.00 AS DECIMAL(10, 2)), 3),
    (N'SSD-SAM-T7', N'SSD portátil Samsung T7 1 TB', N'Computación', CAST(999.00 AS DECIMAL(10, 2)), 0),
    (N'MIC-ROD-NT', N'Micrófono Rode NT-USB Mini', N'Audio', CAST(1450.00 AS DECIMAL(10, 2)), 8),
    (N'SIL-ERG-01', N'Silla ergonómica Basic', N'Oficina', CAST(2450.00 AS DECIMAL(10, 2)), 2)
) AS seed (Sku, ProductName, CategoryName, UnitPrice, StockQuantity)
INNER JOIN dbo.Categories AS category ON category.Name = seed.CategoryName;
GO